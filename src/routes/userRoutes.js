const router = require('express').Router();
const JWT = require('jsonwebtoken');

//  Middlewares
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

//  User Controllers
const createUser = require('../controllers/user/createUser');
const authenticateUser = require('../controllers/user/authenticateUser');
const updateUserData = require('../controllers/user/updateUserData');
const checkSession = require('../controllers/user/checkSession');
const activateUser = require('../controllers/user/activateUser');
const deactivateUser = require('../controllers/user/deactivateUser');
const getUsers = require('../controllers/user/getUsers');
const getUser = require('../controllers/user/getUser');

//  Password Recover Controllers
const requestPasswordRecovery = require('../controllers/user/requestPasswordRecovery');
const resetPassword = require('../controllers/user/resetPassword');
const sendMail = require('../modules/sendMail');


//  Get Users
router.get('/debug/user/getUsers', (req, res) => {
    getUsers()
        .then(users => { res.json(users); })
        .catch(err => { res.json(err); })
})

//  Create new user
router.post('/user/create', (req, res) => {
    const { name, email, password, confirmPassword, role, churchId } = req.body;

    if (password !== confirmPassword) {
        res.json({
            status: 'error',
            errorId: 'register_01',
            message: 'PASSWORD_CONFIRM_MISMATCH'
        })
    } else if (!validateEmail(email)) {
        res.json({
            status: 'error',
            errorId: 'register_02',
            message: 'INVALID_EMAIL_FORMAT'
        })
    } else if (!validatePassword(password)) {
        res.json({
            status: 'error',
            errorId: 'register_03',
            message: 'INVALID_PASSWORD_FORMAT'
        })
    } else {
        createUser(name, email, password, role, churchId)
            .then(response => {
                if (response.hasOwnProperty('keyValue')) {
                    res.json({
                        status: 'error',
                        errorId: 'register_04',
                        message: 'EMAIL_ALREADY_REGISTERED',
                        response
                    })
                } else {
                    res.json({
                        status: 'success',
                        message: 'USER_CREATED_SUCCESSFULLY'
                    })
                }
            })
            .catch(err => { res.json(err); })
    }
})

router.post('/user/find', (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.json({
            success: false,
            message: 'User ID is not informed'
        })
    } else {
        getUser(id)
            .then(response => {
                if(!response) {
                    res.json({
                        success: false,
                        message: 'User not found'
                    })
                } else {
                    res.json({
                        success: true,
                        response: response
                    })
                }
            })
    }
})


//  Auhtenticate a user
router.post('/user/login', (req, res) => {
    const {email, password} = req.body;

    authenticateUser(email, password)
        .then(response => {
            if (response.status == 'error') {
                res.json(response);
            } else {
                const token = JWT.sign(
                    { id: response.userId },
                    process.env.SECRET,
                    {expiresIn: '1d'}
                );

                res.json({
                    userData: response,
                    token
                })
            }
        })
        .catch(err => { res.json(err) })
})

//  Validate the session token
router.post('/user/validateSession', (req, res) => {
    const {token} = req.body;

    checkSession(token)
        .then((response) => { res.json(response) })
        .catch((err) => { res.json(err) })
})

//  Update a user data
router.put('/user/update', (req, res) => {
    const {id, key, newvalue} = req.body;

    updateUserData(id, key, newvalue)
        .then(response => {
            res.json(response);
        })
        .catch(err => { res.json(error) })
})

//  Request a new password recover
router.post('/user/requestPasswordRecovery', (req, res) =>{
    const { email } = req.body;

    requestPasswordRecovery(email)
        .then((response) => { res.json(response) })
        .catch((err) => { res.json(err) })
})

//  Setting the new password
router.post('/user/resetPassword', (req, res) => {
    const { userId, token, newPassword } = req.body;

    resetPassword(userId, token, newPassword)
        .then(response => { res.json(response)})
        .catch((err) => { res.json(err) })
})

//  Send a email to the user
router.post('/user/sendEmail', (req, res) => {
    const { email, subject, text, html } = req.body;

    sendMail(email, subject, text, html)
        .then(response => { res.json( response ) })
        .catch((err) => { res.json(err) })
})

//  Activate a user
router.put('/user/activate', (req, res) => {
    const {id} = req.body;

    activateUser(id)
        .then((response) => { res.json(response) })
        .catch((err) => { res.json(err) })
})

//  Deactivate a user
router.put('/user/deactivate', (req, res) => {
    const {id} = req.body;

    deactivateUser(id)
        .then((response) => { res.json(response) })
        .catch((err) => { res.json(err) })
})

module.exports = router;