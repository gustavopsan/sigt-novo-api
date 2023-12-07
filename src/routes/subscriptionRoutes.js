const router = require('express').Router();

// Subscription Controllers
const createSubscription = require('../controllers/subscription/createSubscription');
const getSubscriptions = require('../controllers/subscription/getSubscriptions');
const updateSubscription = require('../controllers/subscription/updateSubscription');
const removeSubscription = require('../controllers/subscription/removeSubscription');

router.post('/subscriptions/createSubscription',  (req, res) => {
    const { name, churchId, subscriptionType, subscriptionValue, subscriptionPaymentType, subscriptionPaymentStatus } = req.body;

    createSubscription(name, churchId, subscriptionType, subscriptionValue, subscriptionPaymentType, subscriptionPaymentStatus)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
})

router.get('/subscriptions/getSubscriptons', (req, res) => {
    getSubscriptions()
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
})

router.put('/subscriptions/updateSubscription', (req, res) => {
    const {id, key, value} = req.body;

    updateSubscription(id, key, value)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(error) 
        });
})

router.post('/subscriptions/deleteSubscription', (req, res) => {
    const { subscriptionId } = req.body;

    removeSubscription(subscriptionId)
        .then(subscriptionDeleted => {
            res.json(subscriptionDeleted);
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;