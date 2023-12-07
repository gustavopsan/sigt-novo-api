const axios = require("axios");
const PixBillingModel = require("../../models/pixBilling"); 
const endpoint = process.env.PAYMENTS_ENDPOINT + "/billings/generateBillingRequest";

async function generateBillingRequest(customerName, customerEmail, customerPhone, paymentValue, paymentDescription) {
    const generatedRequest = await axios.post(
        endpoint,
        {
            paymentValue,
            paymentDescription
        },
        {
            "Content-Type": "application/json"
        }
    );

    var location = generatedRequest.data.loc.location;
    var arrLocation = location.split("/");
    var locationId = arrLocation[2];

    try {
        const savedRequest = await PixBillingModel.create(
            {
                txid: generatedRequest.data.txid,
                description: generatedRequest.data.solicitacaoPagador,
                value: parseFloat(generatedRequest.data.valor.original),
                customerName,
                customerEmail,
                customerPhone,
                url: "https://pix.gerencianet.com.br/cob/pagar/" + locationId,
                qrCode: {
                    code: generatedRequest.data.qrcode,
                    image: generatedRequest.data.imageQrcode
                },
                active: true,
                originalData: generatedRequest.data
            }
        );

        return savedRequest;
    } catch (error) {
        return error;
    }
}

module.exports = generateBillingRequest;