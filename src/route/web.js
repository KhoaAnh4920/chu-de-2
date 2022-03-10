import express from "express";
import UserController from "../controllers/UserControler"

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


    return app.use("/", router);
}

module.exports = initWebRoutes;