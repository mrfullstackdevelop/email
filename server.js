const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const nodemailer = require("nodemailer")

app.use(bodyParser.json())

app.post("/send", async (req, res) => {
        const { email, from, subject, content, dkim, domain, selector } = req.body
        nodemailer.createTransport({
            sendmail: true,
            newline: "unix",
            path: "/usr/sbin/sendmail"
        }).sendMail({
            encoding: "base64",
            from: from,
            to: email,
            subject: subject,
            html: content,
            dkim: {
                domainName: domain,
                keySelector: selector.trim(),
                privateKey: dkim.trim()
            }
        }, (error, info) => {
            return res.status(200).json({
                error: error ? error : false,
                information: info
            })
        })
})


app.listen(3800, () => console.log("Server Started: http://127.0.0.1:3800"))
