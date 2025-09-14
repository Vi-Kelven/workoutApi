export interface IRolesController {
    loginAccount(req, res): Promise<void>
    createAccount(req: any, res: any): Promise<any>
    updateAccount(req: any, res: any): Promise<any>
    deleteAccount(req: any, res: any): Promise<any>
}