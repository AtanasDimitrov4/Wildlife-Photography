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

        res.redirect('all-posts');
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
    res.render('posters/all-posts', { posters } );

    } catch(err) {
        res.redirect('404');
    }
});   

posterController.get('/:posterId/details', async (req, res) => {
   const posterId = req.params.posterId;
   
   try {
    const poster = await posterService.getOne(posterId);
    const isAuthor = req.user && req.user.id === poster.author.toString();
    const isVoted = poster.votes.includes(req.user?.id);

    res.render('posters/details', { poster, isAuthor, isVoted });

   } catch (err) {
    const error = getErrorMessage(err);
    return res.render('/posters/details', { error })
   }
    
});

posterController.get('/:posterId/edit', isAuth, async (req, res) => {
    const posterId = req.params.posterId;
    const poster = await posterService.getOne(posterId);
    const userId = req.user?.id;

    if (poster.author != userId) {
        return res.redirect('404');
    }

    res.render('posters/edit', { poster })
});

posterController.post('/:posterId/edit', isAuth, async (req, res) => {
   const posterId = req.params.posterId;
   const posterData = req.body;
   
   try {
    await posterService.update(posterId, posterData);

    return res.redirect(`/posters/${posterId}/details`)
    } catch (err) {
        res.render('posters/create', { 
            error: getErrorMessage(err),
            poster: posterData
        });
    }
});

posterController.get('/:posterId/delete', isAuth, async (req, res) => {
    const posterId = req.params.posterId;
    const poster = await posterService.getOne(posterId);
    const userId = req.user?.id;

    if (poster.author != userId) {
        return res.redirect('404');
    }

    await posterService.remove(posterId);

    res.redirect('/all-posts');
});

posterController.get('/vote/:posterId/:type', isAuth, async (req, res) => {
    const posterId = req.params.posterId;
    const poster = await posterService.getOne(posterId);
    const type = req.params.type == 'upvote' ? 1 : -1;
    const userId = req.user?.id;

    try {
        await posterService.vote(posterId, userId, type);
        res.redirect(`/posters/${posterId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        
        res.render('posters/details', { poster, error });
    }
});


export default posterController;