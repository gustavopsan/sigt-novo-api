const router = require('express').Router();

const getLastForms = require('../controllers/mainForm/getLastForms');
const searchForms = require('../controllers/mainForm/searchForms');

router.get('/form/getAllForms', (req, res) => {
    const weekFormAmount = 9;
    const monthFormAmount = 3;

    getLastForms(weekFormAmount, monthFormAmount)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({
                errorId: 'ReturnFormsError',
                error: error
            })
        });
})

router.post('/form/search', (req, res) => {
    const { churchId, monthId, year } = req.body;

    searchForms(churchId, monthId, year)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({
                errorId: 'SearchError',
                error: error
            });
        });

})

module.exports = router;