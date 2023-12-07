import pdf from "html-pdf";
import pdfTemplate from "../documents/index.js";
import emailTemplate from "../documents/email.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import transporter from "../config/mailer.config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let options = {format: "A4"};


export const createPDF = (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile("invoice.pdf", (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
}

export const fetchPDF = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../invoice.pdf');
        res.sendFile(filePath);
    }catch (e) {
        console.log(e.message)
        res.send(Promise.reject());
    }
}

export const sendPDF = (req, res) => {
    const {email, company} = req.body;
    pdf.create(pdfTemplate(req.body), options).toFile("invoice.pdf", (err) => {
        transporter.sendMail({
            from: ` Mamat Gunshop <hello@gunshop.com>`,
            to: `${email}`,
            replyTo: `${company.email}`,
            subject: `Invoice from ${
                company.businessName ? company.businessName : company.name
            }`,
            text: `Invoice from ${
                company.businessName ? company.businessName : company.name
            }`,
            html: emailTemplate(req.body),
            attachments: [
                {
                    filename: "invoice.pdf",
                    path: `./invoice.pdf`,
                },
            ],
        });

        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
}