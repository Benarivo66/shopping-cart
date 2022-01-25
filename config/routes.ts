import {Application} from 'express';

export default function router(
    app: Application,
    routes: (app: Application) => void
) {
    routes(app);
}