import express, {Application} from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { IDatabase } from './database';
import {port} from './env';
import installRoutes from './routes';

const app = express();

export default class ExpressServer {
    constructor() {
        app.use(cors());
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
    }

    router(routes: (app: Application) => void): ExpressServer {
        installRoutes(app, routes);
        return this;
    }

    database(db: IDatabase): ExpressServer {
        db.init();
        return this;
    }

    listen(p: string | number = port): Application {
        const welcome = () => console.log('app is running');
        http.createServer(app).listen(p, welcome);
        return app;
    }
}


