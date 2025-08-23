interface IMuscleController {
    execute(req: any, res: any): Promise<void>
}

export = IMuscleController
