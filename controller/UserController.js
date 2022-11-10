const { Op } = require('sequelize')
const {User, Profile, Post} = require('../models')

class UserController {
    static renderRegister(req, res) {
        res.render('register')
    }

    static handleRegister(req, res) {

    }

    static renderLogin(req, res) {
        res.render('login')
    }

    static handleLogin(req, res) {

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
        Post.destroy({where: {id : id}})
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