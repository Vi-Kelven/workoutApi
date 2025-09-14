import { Router } from 'express';
import { post as helloTemplate } from './stack/hello-template/post'
import { post as maleWorkout } from './v1/generate-workout/male/post'

import { post as login } from './auth/post-login'
import { postInsert as createAccount } from './v1/members/post-insert';
import { putAccount as updateAccount } from './v1/members/put';
import { deleteAccount as deleteAccount } from './v1/members/delete';

import { get as listMuscles } from './v1/muscle/get'
import { get as listExercises } from './v1/exercises/get'

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

//Autenticacao
routes.post('/login', ehw(login))
routes.post('/cadastro', ehw(createAccount))
routes.put('/usuário/:id', ehw(updateAccount))
routes.delete('/usuário/:id', ehw(deleteAccount))

routes.get('/muscles', ehw(listMuscles))
routes.get('/exercises', ehw(listExercises))


export { routes, ehw }
