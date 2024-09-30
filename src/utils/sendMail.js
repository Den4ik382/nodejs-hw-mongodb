import nodemailer from 'nodemailer';

// import { SMTP } from '../constants/index.js';
// import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: '7d06c2001@smtp-brevo.com',
    pass: '79WSzC0LAGPrR3Mn',
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
