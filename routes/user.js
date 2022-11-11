const express = require('express')
const router = express()
const UserController = require('../controller/UserController')
const landingController = require('../controller/landingController')
const ProfileController = require('../controller/profileController')

// LANDING, REGISTER & LOGIN
router.get('/', landingController.landingPage)
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.handleRegister)
router.get('/login', UserController.renderLogin)
router.post('/login', UserController.handleLogin)
router.get('/user/logout', UserController.logout)

//MIDDLEWARE USER
router.use((req, res, next) => {
    if (!req.session.role) {
        res.redirect('/')
    } else {
        next()
    }
})

//USER
router.get('/user/home', UserController.renderHomePage)
router.get('/user/profile', ProfileController.renderUserProfile)
router.get('/user/addpost', ProfileController.renderAddPost)
router.post('/user/addpost', ProfileController.addPost)
router.get('/user/profile/edit/:id', ProfileController.renderEditPost)
router.post('/user/profile/edit/:id', ProfileController.editPost)
router.get('/user/delete/:id', UserController.deletePost)


//MIDDLEWARE ADMIN
router.use((req, res, next) => {
    if (req.session.role = 2) {
        res.redirect('/user/home')
    } else {
        next()
    }
})

//ADMIN
router.get('/admin/home', UserController.renderAdminPage)







module.exports = router