"use strict";
const config = require("./../config");
const DbService = require('moleculer-db');
const Sequelize = require("sequelize");
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const { Context } = require("moleculer");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
    name: "shop",
    mixins: [DbService],
    adapter: new SequelizeAdapter(config.URI_MYSQL_CLOUD || config.URI_MYSQL),
    model: {
        name: "stores",
        define: {
            _id: {
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: Sequelize.STRING,
            phone: {
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            password: Sequelize.STRING,
            active: Sequelize.STRING,
            dayStart: Sequelize.DATE,
            timeOpen: Sequelize.TIME,
            timeClose: Sequelize.TIME,
            productCategory: Sequelize.STRING,
            logo: Sequelize.BLOB,
            agreeTerm: Sequelize.BOOLEAN,
            area: Sequelize.STRING,
            province: Sequelize.STRING,
            district: Sequelize.STRING,
            ward: Sequelize.STRING,
            address: Sequelize.STRING,
            longitude: Sequelize.FLOAT,
            latitude: Sequelize.FLOAT,
        },
        options: {
            // Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
            timestamps: false
        }
    },
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
    settings: {
        fields: ["_id", "name", "phone", "email", "password", "active", "dayStart", "timeOpen", "timeClose",
            "productCategory", "logo", "agreeTerm", "area", "province", "district", "ward", "address", "longitude", "latitude"]
    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {
        updateById: {
            rest: {
                method: "PUT",
                path: "/shop/:_id/update"
            },
            params: {
                _id: "string", //"uuid",
            },
            async handler(ctx) {
                let result = await this.adapter.updateById(ctx.params._id, { $set: ctx.params });
                result = this.adapter.entityToObject(result);
                if (!result) {
                    ctx.meta.$statusCode = 500;
                    ctx.meta.$statusMessage = "Không cập nhật được thông tin shop!";
                    return null;
                }
                return result;
            }
        },
        registerShop: {
            rest: {
                method: "POST",
                path: "/shop/register"
            },
            params: {
                email: "string",
            },
            async handler(ctx) {
                try {
                    const data = this.adapter.find({ fields: ["name", "phone"], query: { email: ctx.params.email } });
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        getShopByEmail: {
            rest: {
                method: "GET",
                path: "/email/:email"
            },
            params: {
                email: "string",
            },
            async handler(ctx) {
                try {
                    const data = this.adapter.find({ fields: ["name", "phone"], query: { email: ctx.params.email } });
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }
        },

        findRaw() {
            return this.adapter.db.query("SELECT * FROM stores").then(([res]) => res);
        }
    },
    afterConnected() {
        this.logger.info("Database Connected In ShopNode's Shop Service Successfully");
        //return this.adapter.clear();//seem to delete data in database
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
