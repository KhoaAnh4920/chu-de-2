import express from "express";
import UserController from "../controllers/UserControler";
import GenresController from "../controllers/GenresControler"

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', (req, res) => {
        return res.send('Hello world')
    });


    // CRUD User //
    router.get('/api/get-roles', UserController.getAllRoles);
    router.post('/api/create-new-user', UserController.handleCreateNewUser);
    router.get('/api/get-all-user', UserController.handleGetAllUser);
    router.get('/api/get-edit-user', UserController.getEditUser);
    router.put('/api/edit-user', UserController.handleEditUser);
    router.delete('/api/delete-user', UserController.handleDeleteUser);

    // CRUD Genres //
    router.post('/api/create-new-genres', GenresController.handleCreateNewGenres);
    router.get('/api/get-all-genres', GenresController.handleGetAllGenres);
    router.get('/api/get-edit-genres', GenresController.getEditGenres);
    router.put('/api/edit-genres', GenresController.handleEditGenres);
    router.delete('/api/delete-genres', GenresController.handleDeleteGenres);


    return app.use("/", router);
}

module.exports = initWebRoutes;