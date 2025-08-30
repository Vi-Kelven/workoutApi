// ✅ App do Express — configura segurança básica, CORS, JSON e monta as rotas
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { routes } from "./routes/routes";

// ⚠️ (Opcional, recomendado em produção) Middleware de segurança HTTP
// import helmet from "helmet";

// ⚠️ (Opcional) Limitar requisições por IP para evitar abuso/bruteforce
// import rateLimit from "express-rate-limit";

const app = express();

/* -------------------------------------------------------
 * 1) Segurança e utilidades (opcionais, porém recomendadas)
 * -------------------------------------------------------
 */
// Habilita headers de segurança HTTP padrão (remove X-Powered-By, ajusta CSP, etc.)
// app.use(helmet());

/*
// Rate limit básico: 100 reqs a cada 15 min por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  standardHeaders: true, // retorna info pelos headers RateLimit-*
  legacyHeaders: false,  // desativa X-RateLimit-*
});
app.use(limiter);
*/

/* -------------------------------------------------------
 * 2) CORS (Cross-Origin Resource Sharing)
 * -------------------------------------------------------
 * - Necessário para que o front (outras origens) consigam chamar a API.
 * - Adicione aqui as origens do seu front (dev e produção).
 */
app.use(
  cors({
    origin: [
      // 🔧 DEV:
      "http://localhost:3000", // CRA / Next em dev
      "http://localhost:5173", // Vite (se um dia usar)
      // 🌐 PRODUÇÃO (exemplos — ajuste para o seu domínio):
      // "https://seu-dominio.com",
      // "https://www.seu-dominio.com",
    ],
    credentials: true, // permite cookies/autenticação se você usar com JWT em cookie
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // (opcional) restringir métodos
    // allowedHeaders: ["Content-Type", "Authorization"],   // (opcional) restringir headers
  })
);

/* -------------------------------------------------------
 * 3) Logs
 * -------------------------------------------------------
 * - 'dev' mostra método, status, tempo e caminho. Ótimo para desenvolvimento.
 */
app.use(morgan("dev"));

/* -------------------------------------------------------
 * 4) Parsers de body
 * -------------------------------------------------------
 * - Necessário para ler JSON e, opcionalmente, urlencoded.
 */
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // (se precisar ler forms x-www-form-urlencoded)

/* -------------------------------------------------------
 * 5) Prefixo das rotas da API
 * -------------------------------------------------------
 * - Tudo que está no arquivo routes será servido sob /api
 * - Ex.: POST http://localhost:3001/api/login
 */
app.use("/api", routes);

/* -------------------------------------------------------
 * 6) Middleware de erro (fallback)
 * -------------------------------------------------------
 * - Qualquer erro não capturado acima cai aqui.
 * - Evita travar o servidor com exceções não tratadas.
 */
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // Em produção, evite logar dados sensíveis
    console.error("Erro não tratado:", err);

    // Se o erro já tiver status/shape, você pode respeitar:
    // if (err.status) return res.status(err.status).json({ mensagem: err.message });

    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
);

/* -------------------------------------------------------
 * 7) Outras configurações úteis
 * -------------------------------------------------------
 * - app.set("trust proxy", 1) é útil se estiver atrás de proxy (Heroku/Render/Nginx)
 *   para que Express entenda IP real do cliente ao usar rate-limit, etc.
 */
// app.set("trust proxy", 1); // (opcional)

export default app;
