"use strict";
const config = require("./../config");
const DbService = require('moleculer-db');
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const mongoose = require("mongoose");
const { Context } = require("moleculer");

mongoose.set('useFindAndModify', false);

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
    name: "customer",
    mixins: [DbService],
    adapter: new MongooseAdapter(config.URL_MONGODB),
    //define model
    model: mongoose.model("customers", mongoose.Schema({//you find in CUSTOMER DB from a hosting mongodb of Hoang
        //rest fields at here and viewing code in mdm project to know further more
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: false },
        code: { type: Number, default: null },
        phone: { type: String, required: true },
        name: { type: String, required: true },
        birth: { type: Date, required: true },
        sex: { type: String, required: true },
        address: {
            region: { type: String, enum: ['mienbac', 'miennam', 'mientrung'] },
            province: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
            address: { type: String, required: true },
        },
    })),
    // Add Hooks to DB actions or action which you want
    hooks: {
        before: {
            // create: [
            //     function addTimestamp(ctx) {
            //         // Add timestamp
            //         ctx.params.createdAt = new Date();
            //         return ctx;
            //     }
            // ]
        },
        after: {
            // get: [
            //     // Arrow function as a Hook
            //     (ctx, res) => {
            //         // Remove sensitive data
            //         delete res.mail;
            //         delete res.phoneNumber;

            //         return res;
            //     }
            // ]
        },
        error: {
            // Global error handler
            // "*": function(ctx, err) {
            //     this.logger.error(`Error occurred when '${ctx.action.name}' action was called`, err);

            //     // Throw further the error
            //     throw err;
            // }
        }
    },

    /**
     * Settings
     */
    settings: {},

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {},
    afterConnected() {
        this.logger.info("Database Connected In CustomerNode1's customer Service Successfully");
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
