import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

export default rootRouter;
