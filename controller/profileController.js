const {User, Profile, Post} = require('../models')

class ProfileController {
    static renderAddPost(req, res) {
        const errors = req.query.errors
        res.render('addPost', { errors })
    }

    static addPost(req, res) {
        const {caption} = req.body
        Post.create( { caption } ) 
        .then((_) => {
            res.redirect('/user/home')
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let errors = err.errors.map(x => x.message)
                res.redirect(`/?errors=${errors}`)
            }
        })
    }

    static renderEditPost(req, res) {
        const errors = req.query.errors
        const id = +req.params.id
        Profile.findOne({where : {id: id}})
        .then(data => {
            res.render('editProfile', { data, errors})
        })
        .catch(err => {
          res.send(err)
        })
    }

    static editPost(req, res) {
        const id = +req.params.id
        const { userName, profilePicture, bio, phoneNumber, birthDate, hobby} = req.body
        Profile.update({ userName, profilePicture, bio, phoneNumber, birthDate, hobby }, {where :{id : id}})
        .then((_) => {
            res.redirect('/user/home')
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError') {
                let errors = err.errors.map(x => x.message)
                res.redirect(`/?errors=${errors}`)
            }
        })
    }

    static renderUserProfile(req, res) {
        const { UserId } = req.session
        User.findByPk(UserId, {
            include: [
                {
                    model: Post,
                },
                {
                    model: Profile
                }
            ]
        })
        .then(data => {
            res.render('userProfile', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ProfileController