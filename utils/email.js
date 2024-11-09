const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"GMAIL",
    auth:{
        user: "shazaniyu@gmail.com",
        pass : "qkyfkijphqdixilh",
    },
    tls:{
        rejectUnauthorized: false
    }
})


const sendEmail = async (email, id) => {
    let URL = `http://localhost:6400/api/users/verify-mail/${id}`
    // Setup email data
    let mailOptions = {
        from: 'shazaniyu@gmail.com', // Sender address
        to: `${email}`, // List of recipients
        subject: 'BITNEX', // Subject line
        text: `VERIFY EMAIL `, // Plain text body
        // You can add HTML to the email if needed
        html: `<a href= ${URL}> verify Email  </a>`
    };


    try {
        await transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        })
    } catch (error) {
        console.log(error)
    }
}


const contact = (req, res)=>{

}

module.exports = {sendEmail, contact}