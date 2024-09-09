import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET, 
  'https://developers.google.com/oauthplayground'
);

// Set the refresh token
OAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// Generate an OAuth2 access token
const getAccessToken = async () => {
  return await OAuth2Client.getAccessToken();
};

const CONTACT_MESSAGE_FIELDS = {
  fullName: "Full Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  message: "Message",
};

const generateOrderHtmlContent = (data) => {
  // Generate the HTML for order details
  const orderDetails = data.orders
    .filter(order => order.productName && order.quantity)
    .map(order => `<li>${order.productName}: ${order.quantity} Kg</li>`)
    .join('');

  // Generate the HTML for other form fields
  const htmlData = Object.entries(data)
    .filter(([key]) => key !== 'orders') // Exclude 'orders' field from general HTML content
    .reduce((str, [key, val]) => {
      return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key] || key}</h3><p class="form-answer" align="left">${val}</p>`);
    }, "");

  return {
    text: Object.entries(data)
      .filter(([key]) => key !== 'orders') // Exclude 'orders' field from text content
      .reduce((str, [key, val]) => (str += `${CONTACT_MESSAGE_FIELDS[key] || key}: \n${val} \n \n`), ""),
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Order Request</h2> <div class="form-container">${htmlData}<h4>Order Details:</h4><ul>${orderDetails}</ul></div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { fullName, email, phone, company, orders, message } = req.body;

  if (!fullName || !email || !phone || !orders.length || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        accessToken: accessToken.token, // Use the generated access token
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: "dreamy.designs.oussama@gmail.com",
      subject: `New Order Request from ${fullName}`,
      ...generateOrderHtmlContent({ fullName, email, phone, company, orders, message }),
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
