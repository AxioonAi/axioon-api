import { env } from "@/env";
import { EmailSendError } from "@/helper/errors/EmailSendError";
import nodemailer from "nodemailer";
export const sendMail = async (email: string, code: string) => {
	const transporter = nodemailer.createTransport({
		service: "SendinBlue",
		auth: {
			user: env.SMTP_LOGIN,
			pass: env.SMTP_KEY,
		},
		tls: {
			ciphers: "SSLv3",
		},
	});

	const mailOptions = {
		from: env.SMTP_LOGIN,
		to: email,
		subject: "Recuperação de senha",
		html: html(code),
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			throw new EmailSendError();
		}
	});
};

const html = (code: string) => {
	return `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {
            text-decoration: underline !important;
        }
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https:onts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a href="https:akeshmandal.com" title="logo" target="_blank">
                                <img width="180"
                                    src="https:enhor-resolve.s3.us-east-2.amazonaws.com/user/1693853353267.jpg"
                                    title="" alt="">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1
                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                            Você solicitou uma Recuperação de Senha</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Não podemos te enviar sua senha antiga, estamos te enviando
                                            um código que será requerido na hora de recuperar sua senha
                                            em nosso aplicativo, basta inserir esse código e criar sua
                                            nova senha
                                        </p>
                                        <p style="background:#030A58; font-weight:600; margin-top:35px; color:#fff; font-size:14px;padding:10px 24px;display:inline-block;border-radius:10px;">
                                            ${code}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p
                                style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                                &copy; <strong>www.axioon.com.br</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>

`;
};
