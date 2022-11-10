const { User, Post, Profile } = require('../models')
const  bcrypt = require('bcryptjs')

class UserController {
    static renderRegister(req, res) {
        res.render('register')
    }

    static handleRegister(req, res) {
        const { email, password } = req.body
        User.create({ email, password })
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
        User.findOne({ where: { email } })
            .then((data) => {
                if (data) {
                    const validPassword = bcrypt.compareSync(password, data.password)
                    if (validPassword) {

                        req.session.role = data.role
                        return res.redirect('/user/home')
                    } else {
                        const error = 'Invalid Email/Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }

    static renderHomePage(req, res) {
        res.render('homePage')
    }

    static deletePost(req, res) {

    }

    static renderAdminPage(req, res) {

    }
}

module.exports = UserController