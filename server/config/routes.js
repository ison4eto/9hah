const UsersController = require('../controllers/UsersController');
const MemeController = require('../controllers/MemeController');
const CommentController = require('../controllers/CommentController');
const CategoryController = require('../controllers/CategoryController'); 
const auth = require('../config/auth')
const upload = require('../config/uploadConfiguration').upload

module.exports = (app) => {

    app.post('/login', UsersController.loginPost);
    app.post('/register', UsersController.registerPost);

    app.post('/meme/upload', upload.single('selectedFile'), MemeController.uploadMeme)
    app.put('/meme/approve', MemeController.approveMeme)
    app.post('/meme/unapprove', MemeController.unapproveMeme)
    app.get('/meme/all', MemeController.getAllMemes)
    app.get('/meme/:id', MemeController.getMeme)
    app.put('/meme/edit/:id',  upload.single('selectedFile'), MemeController.editMeme)
    app.post('/meme/rate/:id', MemeController.rateMeme)
    app.get('/admin/memes', MemeController.getUnapprovedMemes)

    /*app.get('/admin/memes', auth.UserRoute, MemeController.getUnapprovedMemes);*/

    app.get('/category/all', CategoryController.getAllCategories)
    app.post('/category', CategoryController.uploadCategory)
    app.get('/category/:name', CategoryController.getCategory)
    app.post('/category/edit/:name', CategoryController.editCategory)
    app.post('/category/delete/:name', CategoryController.removeCategory)

    app.post('/search', MemeController.search)

    app.get('/comment/:id', CommentController.getAllComments)
    app.post('/comment/upload', CommentController.uploadComment)
};