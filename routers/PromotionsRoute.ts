import { Request, Response, Router } from 'express';
import data from '../data/promotions/RowsData';

const basePromotionsPath = '/promotions';
let promotionsRouter: Router = Router();

promotionsRouter.get(basePromotionsPath, (req: Request, res: Response) => {
    return res.send(data).status(200).end();
});

export default promotionsRouter;
