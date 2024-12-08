import FormData from "form-data"
import config from 'config'
import axios from "axios";

export const sendEmail = async (
    to: string,
    templateName: String,
    subject: string,
    templateVars: Record<string, any> = {},
) => {
    try {
        const form = new FormData();
        form.append('to', to);
        form.append('template', templateName);
        form.append('subject', subject);
        form.append('from', 'sandboxe452744fce9c4b839cf102f0f7747565.mailgun.org');

        Object.keys(templateVars).forEach((key) => {
            form.append(`v:${key}`, templateVars[key]);
        })

        const username = 'api';
        const password = config.get('emailService.privateKey')
        const token = Buffer.from(`${username}:${password}`).toString('base64')

        const response = await axios({
            method: 'post',
            url: `https://api.mailgun.net/v3/${config.get('emailService.testDomain')}/messages`,
            headers: {
                Authorization: `Basic ${token}`,
                contentType: 'multipart/form-data'
            },
            data: form
        })

        return response
    } catch (error) {
        console.log(error)
    }
}        