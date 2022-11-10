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
        res.render('homePage')
    }

    static deletePost(req, res) {

    }
    
    static renderAdminPage(req, res) {
        
    }
}

module.exports = UserController