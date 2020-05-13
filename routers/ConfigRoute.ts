import { Request, Response, Router } from 'express';
import GridColumnConfig from '../models/GridColumnConfig';
import data from '../data/columns/ConfigData';

const baseColumnsConfigPath = '/config';
let configRouter: Router = Router();

configRouter.get(baseColumnsConfigPath, (req: Request, res: Response) => {
    return res.send(data).status(200).end();
});

export default configRouter;
