const express = require('express')
const router = express()
const UserController = require('../controller/UserController')
const userController = require('../controller/UserController')
const landingController = require('../controller/landingController')
const ProfileController = require('../controller/profileController')

// LANDING, REGISTER & LOGIN
router.get('/', landingController.landingPage)
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.handleRegister)
router.get('/login', UserController.renderLogin)
router.post('/login', UserController.handleLogin)

//USER
router.get('/user/home', UserController.renderHomePage)
router.get('/user/profile', ProfileController.renderUserProfile)
router.get('/user/addpost', ProfileController.renderAddPost)
router.post('/user/addpost', ProfileController.addPost)
router.get('/user/profile/edit', ProfileController.renderEditPost)
router.post('/user/profile/edit', ProfileController.editPost)
router.get('/user/delete/:id', UserController.deletePost)

//ADMIN
router.get('/admin/home', UserController.renderAdminPage)







module.exports = router