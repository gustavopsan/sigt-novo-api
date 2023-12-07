const router = require('express').Router();

const createExpense = require('../controllers/expense/createExpense');
const listExpenses = require('../controllers/expense/listExpenses');
const updateExpense = require('../controllers/expense/updateExpense');
const removeExpense = require('../controllers/expense/removeExpense');
const searchExpenses = require('../controllers/expense/searchExpenses');
const iterateWeekExpenses = require('../controllers/expense/iterateWeekExpenses');

router.post('/expenses/create', (req, res) => {
    const { churchId, description, value, date, category, week } = req.body;

    createExpense(churchId, description, value, date, category, week)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.get('/expenses/list', (req, res) => {
    listExpenses()
        .then(response => res.json(response))
        .catch(err => res.json(err));
})

router.post('/expenses/update', (req, res) => {
    const { id, key, newvalue } = req.body;

    updateExpense(id, key, newvalue)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/expenses/remove', (req, res) => {
    const { id } = req.body;

    removeExpense(id)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/expenses/search', (req, res) => {
    const { churchId } = req.body;

    searchExpenses(churchId)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/expenses/iterate', (req, res) => {
    const { week, churchId } = req.body;

    iterateWeekExpenses(week, churchId)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

module.exports = router;