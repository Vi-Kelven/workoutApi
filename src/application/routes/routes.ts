import { Router } from 'express';
import { post as helloTemplate } from './stack/hello-template/post'
import { post as maleWorkout } from './v1/generate-workout/male/post'

import { get as listMuscles } from './v1/muscle/get'

const routes = Router();

/**
 * Error Handling Wrapper
 * @param requestHandler O handler da rota
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

routes.post('/stack/v1/hello-template', ehw(helloTemplate));
routes.post('/generate/male/workout', ehw(maleWorkout))

routes.get('/muscles', ehw(listMuscles))

export { routes, ehw }
