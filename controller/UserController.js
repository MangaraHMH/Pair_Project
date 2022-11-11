const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const { User, Profile, Post } = require('../models')
const sendEmail = require('../helpers/nodemailer')

class UserController {
    static renderRegister(req, res) {
        const errors = req.query.errors
        res.render('register', { errors })
    }

    static handleRegister(req, res) {
        const { userName, profilePicture, bio, phoneNumber, birthDate, hobby, email, password } = req.body
        User.create({ email, password })
            .then((user) => {
                Profile.create({
                    userName,
                    profilePicture,
                    bio,
                    phoneNumber,
                    birthDate,
                    hobby,
                    UserId: user.id
                })
            })
            .then(() => {
                res.redirect('/login')
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(x => x.message)
                    res.redirect(`/register?errors=${errors}`)
                }
            })
    }

    static renderLogin(req, res) {  
        const errors = req.query.errors
        res.render('login', {errors} )
    }

    static handleLogin(req, res) {
        console.log('hi')
        const { email, password } = req.body
        User.findOne({ where: { email: email } })
            .then((data) => {
                if (data) {
                    const validPassword = bcrypt.compareSync(password, data.password)
                    if (validPassword) {
                        req.session.regenerate(err => {
                            if (err) {
                                res.send(err)
                            } else {
                                req.session.UserId = data.id
                                req.session.role = data.role
                                req.session.save(err => {
                                    if (err) {
                                        res.send(err)
                                    }else {
                                        sendEmail(data.email).then(() => {
                                            if(req.session.role === 2) {
                                                res.redirect('/user/home')
                                            }else if(req.session.role === 1) {
                                                res.redirect('/admin/home')
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                        
                                    }
                                })
                            }
                        })
                    } else {
                        const error = 'Invalid Email/Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid Email/Password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(x => x.message)
                    res.redirect(`/login?errors=${errors}`)
                }
            })
    }

    static renderHomePage(req, res) {
        const { search } = req.query
        const option = {}
        if (search) {
            option.where = Post.getSearch(search)
        }
        Post.findAll(option, {
            order: [['caption', 'DESC']]
        })
            .then(data => {
                res.render('homePage', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deletePost(req, res) {
        const id = +req.params.id
        Post.destroy({ where: { id: id } })
            .then((_) => {
                res.redirect('/user/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }

    static renderAdminPage(req, res) {
        Post.findAll()
        .then(data => {
            res.render('adminPage', { data })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteAsAdmin(req, res) {
        const id = +req.params.id
        Post.destroy({ where: { id: id } })
            .then((_) => {
                res.redirect('/admin/home')
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = UserController