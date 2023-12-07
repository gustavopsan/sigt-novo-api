const router = require('express').Router();

//  Month Form Controllers
const createMonthForm = require('../controllers/monthForm/createMonthForm');
const getMonthForm = require('../controllers/monthForm/getMonthForm');
const deleteMonthForm = require('../controllers/monthForm/deleteMonthForm');

router.post('/form/month/create', (req, res) => {
    const {weekFormIds, churchId, monthData, creatorId} = req.body;

    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    const formId = `mensal-${months[monthData.monthId]}${monthData.year}-${churchId}`;

    createMonthForm(formId, weekFormIds, churchId, monthData, creatorId)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.json(err)
        });
})

router.post('/form/month/load', (req, res) => {
    const { formId } = req.body;

    getMonthForm(formId)
        .then((form) => {
            res.json(form);
        })
        .catch((err) => {
            res.json(err)
        });
})

router.post('/form/month/delete', (req, res) => {
    const { formId } = req.body;

    deleteMonthForm(formId)
        .then((formDeleted) => {
            res.json(formDeleted);
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router;