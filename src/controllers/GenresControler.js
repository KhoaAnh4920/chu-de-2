import GenresService from '../Services/GenresService';

let handleCreateNewGenres = async (req, res) => {
    let message = await GenresService.createNewGenres(req.body);
    return res.status(200).json(message);
}

let handleGetAllGenres = async (req, res) => {
    let genres = await GenresService.getAllGenres();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        genres
    })

}

let getEditGenres = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let data = await GenresService.getEditGenres(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            data
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }


}

let handleEditGenres = async (req, res) => {
    let data = req.body;
    let message = await GenresService.updateGenre(data);
    return res.status(200).json(message)
}

let handleDeleteGenres = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await GenresService.deleteGenres(req.body.id);
    return res.status(200).json(message);
}



module.exports = {
    handleCreateNewGenres,
    handleGetAllGenres,
    getEditGenres,
    handleEditGenres,
    handleDeleteGenres
}