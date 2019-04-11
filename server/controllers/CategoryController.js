const Category = require('mongoose').model('Category');
const Meme = require('mongoose').model('Meme');

module.exports.uploadCategory = (req, res) => {
    Category.create({
        name: req.body.category
    }).then(newCategory => {
        res.json(newCategory);
    }).catch(err =>{
        res.send(406,'This category is already added')
    });
}

module.exports.getAllCategories = (req, res) => {
    Category.find({}).then(categories => {
        res.json(categories)
    }).catch(console.error)
}
module.exports.getCategory = (req, res) => {
    Meme.find({ categories: req.params.name })
        .then(memes => {
            res.json(memes)
        }).catch(console.error)

}

module.exports.editCategory = (req, res) => {
    Meme.updateMany({ categories: req.params.name }, { $set: { 'categories.$': req.body.name } })
    .then(memes => {
        res.memesModified = `${memes.nModified} meme${memes.nModified === 1 ? '' : 's'} modified`
        Category.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.body.name } })
            .then(result => {
                res.json({
                    memesModified: res.memesModified,
                    ...result
                })
            }).catch(console.error)
    }).catch(console.error)

}
module.exports.removeCategory = (req, res) => {
    Meme.updateMany({ categories: req.params.name }, { $pull: { categories: req.params.name } })
        .then(memes => {

            res.memesModified = `${memes.nModified} meme${memes.nModified === 1 ? '' : 's'} modified`
            Category.findOneAndRemove({ name: req.params.name })
                .then(result => {
                    res.json({
                        memesModified: res.memesModified,
                        ...result
                    })
                }).catch(console.error)
        }).catch(console.error)

}

