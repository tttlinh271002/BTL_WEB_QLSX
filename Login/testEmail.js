import Mailjet from 'node-mailjet';
var API_key = 'd3d88137bd5ddfbc53f9170d4c22aa81';
var sc_key = '332870c01eb409e0dcec3f08696ec852';

function sendEmail() {
    const mailjet = Mailjet
        .apiConnect(API_key, sc_key);
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "hoangtai041102@gmail.com",
                    "Name": "Hoàng"
                },
                "To": [{
                    "Email": "hoangtai041102@gmail.com",
                    "Name": "Hoàng"
                }],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
            }]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}
module.export = { sendEmail: sendEmail }