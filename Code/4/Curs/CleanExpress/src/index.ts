import { env } from "./env";
import { makeApp } from "./app";
import { log } from "./log";

import { Application } from "express";

makeApp()
    .then((app: Application) => app.listen(env.PORT, () => log(`${env.NODE_ENV} server listening on port ${env.PORT}`)))
    .catch((error: any) => console.log('error (index.ts):', error));
