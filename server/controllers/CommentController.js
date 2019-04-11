const Comment = require('mongoose').model('Comment');

module.exports.uploadComment = (req, res) => {
    let c = {
        title: req.body.title,
        content: req.body.content,
        memeId: req.body.memeId
    }

    Comment.create(c).then(newC => {
        res.json(newC);
    }).catch(console.error);
}
module.exports.getAllComments = (req, res) => {
    Comment.find({ memeId: req.params.id }).then(comments => {
        res.json(comments)
    }).catch(console.error)
}