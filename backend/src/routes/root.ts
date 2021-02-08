import { Router, Request, Response } from 'express';

const rootRouter = Router();

/**
 * Base route that returns 200 OK, mainly used to check if the backend is working
 *
 * @route GET /
 */
rootRouter.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default rootRouter;
