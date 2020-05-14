import { Request, Response, Router } from 'express';
import data from '../data/promotions/RowsData';

const basePromotionsPath = '/promotions';
let promotionsRouter: Router = Router();

promotionsRouter.get(
    `${basePromotionsPath}/all`,
    (req: Request, res: Response) => {
        return res.send(data).status(200).end();
    }
);

promotionsRouter.get(basePromotionsPath, (req: Request, res: Response) => {
    const { startIndex, stopIndex } = req.query;
    if (!startIndex || !stopIndex) {
        // if a parameter is missing - return server error
        return res.status(500).send('Missing parameters');
    }

    let results = data.slice(
        parseInt(startIndex as any),
        parseInt(stopIndex as any)
    );

    return res.send(results).status(200).end();
});

export default promotionsRouter;
