import RolesControllerFactory from "../../controller/factories/roles-controller-factory";

const post = async (req: any, res: any) => {
  // debug opcional
  // console.log("POST /login payload =>", req.body);

  // mantém compatibilidade: aceita password ou senha
  req.body = {
    email: (req.body.email || "").trim(),
    username: (req.body.username || "").trim(),
    senha: req.body.password ?? req.body.senha,
  };

  const controller = RolesControllerFactory.create();
  await controller.loginAccount(req, res);
};

export { post };
