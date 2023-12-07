const router = require('express').Router();

const loadYearData = require("../controllers/yearData/loadYearData");

router.post('/form/year', (req, res) => {
    const { year, churchId } = req.body;

    loadYearData(year, churchId)
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

module.exports = router;