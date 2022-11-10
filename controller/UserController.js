
const bcrypt = require('bcryptjs')

const { Op } = require('sequelize')
const { User, Profile, Post } = require('../models')


class UserController {
    static renderRegister(req, res) {
        res.render('register')
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
                res.send(err)
            })
    }

    static renderLogin(req, res) {
        res.render('login')
    }

    static handleLogin(req, res) {
        const { email, password } = req.body
        User.findOne({ where: { email: email } })
            .then((data) => {
                if (data) {
                    const validPassword = bcrypt.compareSync(password, data.password)
                    if (validPassword) {
                        req.session.regenerate(err => {
                            if(err) {
                                res.send(err)
                            }else {
                                req.session.UserId = data.id
                                req.session.role = data.role
                                req.session.save(err => {
                                    if(err) {
                                        res.send(err)
                                    }else {
                                        res.redirect('/user/home')
                                    }
                                })
                            }
                        })
                    } else {
                        const error = 'Invalid Email/Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                }else {
                    const error = 'Invalid Email/Password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static renderHomePage(req, res) {
        const { search } = req.query
        const option = {}
        if (search) {
            option.where = {
                caption: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        Post.findAll(option)
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

    static renderAdminPage(req, res) {

    }
}

module.exports = UserController