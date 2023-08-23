import nodemailer, { TransportOptions } from 'nodemailer';
import { APP_URL, MAIL_PASS, MAIL_USERID, MAIL_PORT, MAIL_SMTP } from '../config';
const smptTransport = {
  host: MAIL_SMTP,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USERID,
    pass: MAIL_PASS
  }
} as TransportOptions

const transporter = nodemailer.createTransport(smptTransport);

export const sendVerificationEmail = (email: string, verifyToken: string) => {
  const verifyUrl = `http://${APP_URL}/verify?token=${verifyToken}`;

  const mailOptions = {
    to: email,
    subject: 'Verify Your Email Address',
    text: `Click the link to verify your email address: ${verifyUrl}`,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve();
      }
    });
  });
};
