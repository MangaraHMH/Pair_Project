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
                res.redirect(`/user/addpost?errors=${errors}`)
            }
        })
    }

    static like(req, res){
        const id = req.params.id
        Post.findOne({
            where: {
                id
            }
        })
        .then((data)=>{
            Post.update({
                like: data.like + 1
            },{
                where: {
                    id
                }
            })
        })
        .then(()=>{
            res.redirect('/user/home')
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static renderEditProfile(req, res) {
        const errors = req.query.errors
        const id = +req.params.id
        Profile.findAll({where: {UserId: id}})
            .then(data => {
                res.render('editProfile', { data, errors })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProfile(req, res) {
        const id = +req.params.id
        let { filename } = req.file
        const { userName, bio, phoneNumber, birthDate, hobby} = req.body
        Profile.update({ userName, profilePicture:filename, bio, phoneNumber, birthDate, hobby }, {where :{UserId : id}})
        .then((_) => {
            res.redirect('/user/profile')
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