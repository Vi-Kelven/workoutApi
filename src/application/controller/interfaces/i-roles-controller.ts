// ✅ Interface do controller para padronizar o método execute
export interface IRolesController {
  // Use tipagem do Express se quiser (Request, Response). "any" também funciona.
  execute(req: any, res: any): Promise<void>;
}
