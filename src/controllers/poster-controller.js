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

        res.redirect('posters/all-posts');
    } catch (err) {
        res.render('posters/create', {
            error: getErrorMessage(err),
            poster: posterData
        });
    }
});

posterController.get('/all-posts', async (req, res) => {
    try {
    const posters = await posterService.getAll();
    } catch(err) {
        res.redirect('404');
    }
    res.render('posters/all-posts', { posters } );
});


export default posterController;