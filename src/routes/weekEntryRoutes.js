const router = require('express').Router();

const createWeekEntry = require('../controllers/weekEntry/createWeekEntry');
const listWeekEntries = require('../controllers/weekEntry/listWeekEntries');
const updateWeekEntry = require('../controllers/weekEntry/updateWeekEntry');
const removeWeekEntry = require('../controllers/weekEntry/removeWeekEntry');
const loadWeekEntry = require('../controllers/weekEntry/loadWeekEntry');

router.post('/entry/create', (req, res) => {
    const { week, churchId, decimists, offers } = req.body;

    createWeekEntry(week, churchId, decimists, offers)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.get('/entry/list', (req, res) => {
    listWeekEntries()
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/entry/update', (req, res) => {
    const { id, key, newvalue } = req.body;

    updateWeekEntry(id, key, newvalue)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/entry/remove', (req,res) => {
    const { id } = req.body;

    removeWeekEntry(id)
        .then(response => res.json(response))
        .catch(err => res.json(error))
})

router.post('/entry/load', (req, res) => {
    const { entryId } = req.body;

    loadWeekEntry(entryId)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

module.exports = router;