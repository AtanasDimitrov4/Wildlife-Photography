import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import { getErrorMessage } from "../utils/error-utils.js";
import posterService from "../services/poster-service.js";


const posterController = Router();

posterController.get('/create', isAuth, (req, res) => {
   res.render('posters/create');
});

posterController.post('/create', isAuth, async (req, res) => {
    const posterData = req.body;
    const userId = req.user.id;

    try {
        await posterService.create(posterData, userId);

        res.redirect('/all-posts');
    } catch (err) {
        res.render('posters/create', {
            error: getErrorMessage(err),
            poster: posterData
        });
    }
});


export default posterController;