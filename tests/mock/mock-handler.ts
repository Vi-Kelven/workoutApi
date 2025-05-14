export const ehw = (requestHandler: (req: any, res: any) => Promise<void>) => {
    return async (req: any, res: any, next: any): Promise<void> => {
      try {
        
        await requestHandler(req, res);
      } catch (err) {
        next(err);
      }
    };
};

