const NodeMailer = require('nodemailer');
const email={};

email.transporter = NodeMailer.createTransport({
    service:'Gmail',
    auth: {
        user: 'enquirygeekshubstravels@gmail.com',
        pass: 'nodemailer'
    },
    tls:{ rejectUnauthorized: true}
    },
    {
    from:'enquirygeekshubstravels@gmail.com',
    headers: {}

    });


module.exports= email;