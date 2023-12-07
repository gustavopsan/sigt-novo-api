const router = require('express').Router();

//  Week Form Controllers
const createWeekForm = require('../controllers/weekForm/createWeekForm');
const deleteWeekForm = require('../controllers/weekForm/deleteWeekForm');
const getWeekForm = require('../controllers/weekForm/getWeekForm');
const searchWeekForms = require('../controllers/weekForm/searchWeekForms');

router.post('/form/week/create', (req, res) => {

    const {churchId, weekData, creatorId, tenths, offers, expenses} = req.body;
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    const formId = `${weekData.weekNumber}-sem-${months[weekData.monthId]}${weekData.year}-${churchId}`;

    createWeekForm(formId, churchId, weekData, creatorId, tenths, offers, expenses)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.json(err)
        });
})

router.post('/form/week/load', (req, res) => {
    const { formId } = req.body;

    getWeekForm(formId)
        .then((form) => {
            res.json(form);
        })
        .catch((err) => {
            res.json(err)
        });
})

router.post('/form/week/search', (req, res) => {
    const { churchId, monthId, year } = req.body;

    searchWeekForms(churchId, monthId, year)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        });
})

router.post('/form/week/delete', (req, res) => {
    const { formId } = req.body;

    deleteWeekForm(formId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;