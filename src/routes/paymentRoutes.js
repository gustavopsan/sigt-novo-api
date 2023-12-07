const router = require("express").Router();

const generateBillingRequest = require("../controllers/payment/generateBillingRequest");
const generateBilletRequest = require("../controllers/payment/generateBilletRequest");
const listBillingRequests = require("../controllers/payment/listBillingRequests");

router.post("/payment/createPaymentRequest", (req, res) => {
    const { customerName, customerEmail, customerPhone, paymentValue, paymentDescription } = req.body;

    generateBillingRequest(customerName, customerEmail, customerPhone, paymentValue, paymentDescription)
        .then(response => {
            res.json(response);
        })
        .catch( err => {
            res.json(err);
        })
});

router.post("/payment/createBilletRequest", (req, res) => {
    const { customerName, customerEmail, customerCPF, customerPhone, paymentValue, paymentDescription } = req.body;

    generateBilletRequest(customerName, customerEmail, customerCPF, customerPhone, paymentValue, paymentDescription)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        })
});

router.post("/payment/listPaymentRequests", (req,res) => {
    const page = req.body.page;

    listBillingRequests(page)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        })
});

module.exports = router;