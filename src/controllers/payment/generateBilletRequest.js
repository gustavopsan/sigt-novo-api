const axios = require("axios");
const endpoint = process.env.PAYMENTS_ENDPOINT + "/billings/generateBolixRequest";
const BilletBillingModel = require("../../models/billetBilling");

async function generateBilletRequest(customerName, customerEmail, customerCPF, customerPhone, paymentValue, paymentDescription) {
    const generatedRequest = await axios.post(
        endpoint,
        {
            customerName,
            customerEmail,
            customerCPF,
            customerPhone,
            paymentValue,
            paymentDescription
        },
        {
            "Content-Type": "application/json"
        }
    );

    var originalPrice = generatedRequest.data.total.toString();
    var stringLength = originalPrice.length;
    
    var first = originalPrice.substring(0, stringLength - 2);
    var last = originalPrice.substring(stringLength - 2);
    var rawPrice = first + "." + last;

    var formattedPrice = parseFloat(rawPrice);

    try {
        const savedRequest = await BilletBillingModel.create(
            {
                chargeId: generatedRequest.data.charge_id,
                customerName,
                customerEmail,
                customerPhone,
                url: generatedRequest.data.link,
                billetLink: generatedRequest.data.billet_link,
                downloadLink: generatedRequest.data.pdf.charge,
                qrCode: {
                    code: generatedRequest.data.pix.qrcode,
                    image: generatedRequest.data.pix.qrcode_image
                },
                barCode: generatedRequest.data.barcode,
                description: paymentDescription,
                value: formattedPrice,
                active: true,
                originalData: generatedRequest.data
            }
        )

        return savedRequest;
    } catch (error) {
        return error;
    }

}

module.exports = generateBilletRequest;