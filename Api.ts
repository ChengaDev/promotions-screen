import express from 'express';
import cors from 'cors';
import configRouter from './routers/ConfigRoute';
import promotionsRouter from './routers/PromotionsRoute';

class PromotionsApi {
    private readonly _port: string;

    constructor(port: string) {
        this._port = port;
    }

    start() {
        const app: express.Application = express();

        app.use(express.json());

        // enable cors
        app.use(cors());
        // add delay to response by middleware
        app.use((req, res, next) => setTimeout(next, 1200));

        // use routers
        app.use(configRouter);
        app.use(promotionsRouter);

        app.listen(this._port, () =>
            console.log(`Promotions API is listening on port ${this._port}!`)
        );
    }
}

const port = process.env.PORT || '3100';
const adminApi = new PromotionsApi(port);
adminApi.start();
