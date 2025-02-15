import { Router } from "express";
import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import posterController from "./controllers/poster-controller.js";


const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/posters', posterController)


export default routes;