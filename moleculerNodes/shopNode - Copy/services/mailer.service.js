"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: "udpt-n06@hotmail.com", // generated ethereal user mdm-project-2022@hotmail.com #password#
      pass: "#password#", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
    name: "mail",
    /**
     * Settings
     */
    settings: {
        routes: [{
            callOptions: {
                timeout: 180 * 1000,
            }

        }]
    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     * Call action
     * broker.call("mail.send", { 
     * to: "john.doe@example.org", 
     * subject: "Hello Friends!", 
     * html: "This is the <b>content</b>!"
     * }).then(console.log);
     */
    actions: {
        sendMailCode: {
            async handler(ctx) {
                const html = 
                    `
                    <div style="display: block; text-align: center;;">
                    <div><h4>Đây là mã code của quý khách. Cẩn thận không chia sẻ với bất kỳ ai!</h4></div>
                    <div><h2 style="font-weight: bold;">${ctx.meta.code}</h2></div>
                    </div>
                    `;
                
                transporter.sendMail({ 
                    to: ctx.params.email, 
                    subject: "ĐI CHỢ ONLINE - GỬI MÃ CODE!", 
                    html,
                })
                .then(console.log)
                .catch(console.error);
            }
        },
        test: {
            rest:{
                method: "GET",
                path: ""
            },
            params: {
                email: "email"
            },
            async handler(ctx) {
                const code = Math.floor(100000 + Math.random() * 900000); //generate 6 digit password

                const html = 
                    `
                    <div style="display: block; text-align: center;;">
                    <div><h4>Đây là mã code của quý khách. Cẩn thận không chia sẻ với bất kỳ ai!</h4></div>
                    <div><h2 style="font-weight: bold;">${code}</h2></div>
                    </div>
                    `;
                console.log("html: ", html);
                transporter.sendMail({ 
                    //from: "mdm-project-2022@hotmail.com",
                    to: ctx.params.email, 
                    subject: "ĐI CHỢ ONLINE - GỬI MÃ CODE!", 
                    html,
                })
                .then(console.log)
                .catch(console.error);
            }
        }
    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {

    },

    /**
     * Service created lifecycle event handler
     */
    created() {

    },

    /**
     * Service started lifecycle event handler
     */
    async started() {

    },

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {

    }
};
