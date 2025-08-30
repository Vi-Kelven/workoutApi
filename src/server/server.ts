// ✅ Carrega variáveis de ambiente (.env)
import dotenv from "dotenv";
dotenv.config({ encoding: "utf8" });

// 🔧 Core/3rd libs
import express from "express";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser"; // você já usa; (alternativa: express.json/urlencoded)
import cookieParser from "cookie-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import apiMetrics from "prometheus-api-metrics";
import crypt from "crypto";
import figlet from "figlet";
import * as swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// 🧩 App internals
import { routes } from "../application/routes/routes";
import { logger } from "../infraestructure/logger/logger";
import BusinessError from "../infraestructure/errors/business-error";
import Metrics from "../infraestructure/metrics/metrics";
import DateUtil from "../infraestructure/util/date-util";


// ----------------------------
// 🎨 Banner simpático no boot
// ----------------------------
const banner = "Workout API";
figlet(banner, (err, data) => {
  if (err) {
    console.error("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// ------------------------------------
// 🚀 Sobe a instância do Express
// ------------------------------------
const app = express();

// ------------------------------------------------------------
// 🌐 CORS — libere os domínios do seu front (dev e produção)
// ------------------------------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:3000", // CRA / Next (dev)
      // "http://localhost:5173", // Vite (se usar em outro projeto)
      // "https://seu-dominio.com", // Produção (exemplo)
    ],
    credentials: true, // necessário se usar cookies/autenticação cross-site
  })
);

// -------------------------------------
// 📈 Métricas de API (Prometheus)
// -------------------------------------
app.use(apiMetrics()); // expõe métricas padrões em /metrics

// -------------------------------------
// ❤️ Health Check simples
// -------------------------------------
app.get("/health", (_req, res) => {
  res.status(200).send({ status: "UP" });
});

// --------------------------------------------------
// 🧾 Log de auditoria por request (req/res)
// --------------------------------------------------
app.use((req: any, res, next) => {
  const encryptData = crypt.randomBytes(16).toString("hex");
  req.encryptID = encryptData;
  logger.info(`Req - ${req.encryptID} - ${req.socket.remoteAddress} - ${req.originalUrl}`);
  next();
});

app.use((req: any, res, next) => {
  const originalSend = res.send.bind(res);
  res.send = (content: any) => {
    logger.info(`Res - ${req.encryptID}`);
    return originalSend(content);
  };
  next();
});

// ---------------------------------------------------------
// 🧵 Distributed tracing básico — X-Request-Id-like
// ---------------------------------------------------------
app.use((req: any, _res, next) => {
  req.id = uuidv4();
  next();
});

// ---------------------------------------------------------
// 🧮 Métricas customizadas (seu wrapper Metrics)
// ---------------------------------------------------------
const metrics = new Metrics();
app.use((req: any, res, next) => {
  const startEpoch = Date.now();
  res.on("finish", () => {
    void metrics.allCustomMetrics(req, res.statusCode, startEpoch);
  });
  next();
});

// ---------------------------------------------------------
// 🛡️ Segurança, compressão e parsers
// ---------------------------------------------------------
app.use(helmet());            // cabeçalhos de segurança (CSP, XSS, etc.)
app.use(compression());       // gzip/deflate
app.use(bodyParser.json({ limit: "50mb" }));         // JSON grande
app.use(bodyParser.urlencoded({ extended: true }));  // forms x-www-form-urlencoded
app.use(cookieParser());

// ⚠️ Alternativa enxuta aos dois bodyParsers acima:
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------
// 📦 Arquivos estáticos (se precisar servir algo público)
// ---------------------------------------------------------
app.use(express.static("public"));
app.use("/public", express.static("public"));

// ---------------------------------------------------------
// 📚 Swagger (UI + YAML)
// ---------------------------------------------------------
const swaggerDocument = YAML.load("src/server/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// → A UI ficará em: http://localhost:3001/api-docs

// ---------------------------------------------------------
// 🧭 ROTAS da aplicação
// ---------------------------------------------------------
// 🔴 Se você prefere endpoint SEM /api, troque para: app.use("/", routes)
app.use("/api", routes);
// Agora seu login fica em: POST http://localhost:3001/api/login

// ---------------------------------------------------------
// 🧯 Tratamento central de erros
// ---------------------------------------------------------
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const currentDateTime = new DateUtil().currentDateTime();
  const handledError: any = { date: currentDateTime };
  let statusCode = 500;

  if (err instanceof BusinessError) {
    handledError.status = "BUSINESS_ERROR";
    statusCode = err.statusCode;
    logger.info(err.message);
    handledError.message = err.message;
    handledError.details = err.details;
  } else {
    logger.error(err.stack);
    handledError.status = "UNKNOWN_ERROR";
    handledError.message = err.message;
  }

  res.status(statusCode).json(handledError);
});

// ---------------------------------------------------------
// 🏁 Bootstrap do servidor HTTP
// ---------------------------------------------------------
const runMigrationsAndInitApp = async (): Promise<void> => {
  try {
    await initApp();
  } catch (err: any) {
    logger.error("ERRO");
    logger.error(err.stack);
  }
};

const initApp = async (): Promise<void> => {
  // Garante que só inicia o listener se este arquivo for o entrypoint
  const requireMainModule = require.main === module;
  if (requireMainModule) {
    const PORT = process.env.PORT ?? 3001;
    const NODE_ENV = process.env.NODE_ENV ?? "localhost";

    const server = app.listen(PORT, () => {
      logger.info(`Listening on port ${PORT} ${NODE_ENV}`);
    });

    // ⏳ Timeout do servidor (20 min) — ajuste se necessário
    server.timeout = 1200000;
  }
};


void runMigrationsAndInitApp();

// Exporta app p/ testes (supertest) e reuso
module.exports = app;
