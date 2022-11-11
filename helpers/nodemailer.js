const nodemailer = require('nodemailer');

function sendEmail(email) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        secure: false,
        service: "gmail",
        secure: true,
        auth: {
            user: "tweetwar2022@gmail.com",
            pass: "hactiv82022"
        },
        debug: false,
        logger: true
    });

    const option = {
        from: "tweetwar2022@gmail.com",
        to: email,
        subject: "Acount Success Create",
        text: "Your Account has been create",
        html: "<b>Your Account has been create</b>"
    };

    transporter.sendEmail(option, (err, info)=>{
        if(err){
            console.log(err);
        }
        console.log("sent: " + info);
    })
}

module.exports = sendEmail