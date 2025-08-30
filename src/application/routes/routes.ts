// ✅ Arquivo central de rotas — registra endpoints da API
import { Router } from "express";

// Exemplos de outros handlers
import { post as helloTemplate } from "./stack/hello-template/post";
import { post as maleWorkout } from "./v1/generate-workout/male/post";

// 🔐 Login
import { post as login } from "./auth/post-login";

// Recursos diversos (exemplos)
import { get as listMuscles } from "./v1/muscle/get";
import { get as listExercises } from "./v1/exercises/get";

const routes = Router();

/**
 * Error Handling Wrapper (EHW)
 * Envolve handlers assíncronos para direcionar exceptions ao middleware de erro.
 */
const ehw = (requestHandler: (req: any, res: any) => Promise<void>) => {
  return async (req: any, res: any, next: any): Promise<void> => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err);
    }
  };
};

// Exemplos de rotas
routes.post("/stack/v1/hello-template", ehw(helloTemplate));
routes.post("/generate/male/workout", ehw(maleWorkout));

// 🔐 Autenticação (login)
// Se seu app montar `routes` sob `/api`, o caminho final será POST /api/login
routes.post("/login", ehw(login));

// Recursos diversos (exemplos)
routes.get("/muscles", ehw(listMuscles));
routes.get("/exercises", ehw(listExercises));

export { routes, ehw };
