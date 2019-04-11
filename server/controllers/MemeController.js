const Meme = require('mongoose').model('Meme');

module.exports.uploadMeme = (req, res) => {
    let meme = {
        title: req.body.title,
        imageUrl: res.req.file.filename,
        ratings: 0,
        categories: [],
        approved: false
    }

    Meme.create(meme).then(newMeme => {
        res.json(newMeme);
    }).catch(console.error);
}


module.exports.approveMeme = (req, res) => {
    let meme = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        ratings: req.body.ratings,
        categories: req.body.categories,
        approved: true,
        date: Date.now()
    }
    Meme.update({ _id: req.body._id }, { $set: meme })
        .then(approvedMeme => {
            res.json(approvedMeme)
        }).catch(console.error)
}

module.exports.unapproveMeme = (req, res) => {
    Meme.findOneAndRemove({ _id: req.body._id })
        .then(result => {
            res.json(result)
        }).catch(console.error)
}
module.exports.getUnapprovedMemes = (req, res) => {
    Meme.find({ approved: false }).then(memes => {
        res.json(memes)
    }).catch(console.error)
}
module.exports.getAllMemes = (req, res) => {
    Meme.find({ approved: true }).then(memes => {
        res.json(memes)
    }).catch(console.error)
}
module.exports.getMeme = (req, res) => {
    Meme.findById(req.params.id).then(meme => {
        res.json(meme)
    }).catch(console.error)

}

module.exports.editMeme = (req, res) => {
    Meme.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            categories: req.body.categories.split(','),
            imageUrl: res.req.file ? res.req.file.filename : req.body.imageUrl,
            date: Date.now()
        }
    }).then(meme => {
        res.json(meme)
    }).catch(console.error)
}
module.exports.rateMeme = (req, res) => {
    Meme.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            ratings: req.body.ratings
        },
        $inc: {
            peopleRated: 1
        }
    }).then(meme => {
        console.log(meme) 
        res.json(meme)
    }).catch(console.error)
}

module.exports.search = (req, res) => {

    const regex = new RegExp(escapeRegex(req.body.search), 'gi');
    Meme.find({ title: regex, approved: true })
        .then(memes => {
            res.json(memes)
            Ca
        }).catch(console.error)
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};  