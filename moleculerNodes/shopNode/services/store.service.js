"use strict";
const config = require("./../config");
const DbService = require('moleculer-db');
const Sequelize = require("sequelize");
const SequelizeAdapter = require('moleculer-db-adapter-sequelize');
const { Context } = require("moleculer");

//Hoàng
const fetch = require("node-fetch");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
    name: "store",
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
                unique: true,
                required: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                required: true,
            },
            password: Sequelize.STRING,
            code: Sequelize.INTEGER,
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
        fields: ["_id", "name", "phone", "email", "password", "code","active", "dayStart", "timeOpen", "timeClose",
            "productCategory", "logo", "agreeTerm", "area", "province", "district", "ward", "address", "longitude", "latitude"],

        //Hoàng
        cors: {
			methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
			origin: "*",
		}
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
        //register
        registerStoreKhoa: {
            rest: {
                method: "POST",
                path: "/register"
            },
            params: {
                phone: {
                    type: "string",
                    unique: true,
                },
                email: {
                    type: "email",
                    unique: true,
                },
                password: "string",
                dayStart: { type: "date", convert: true},
                timeOpen: "string",
                timeClose: "string",
                productCategory: "string",
                logo: {
                    type: "string",
                    default: "",
                    required: false,
                },
                agreeTerm: {
                    type: "number",
                    default: 1,
                    enum: [0, 1],
                    convert: true,
                },
                province: "string",
                district: "string",
                ward: "string",
                address: "string",
                $$strict: "remove",
            },
            async handler(ctx) {
                try {
                    //console.log("ctx.meta.register", ctx.meta);
                    //console.log("ctx.meta.register params", ctx.meta.params);
                    //ctx.call("file.save", this, {meta:{filename:ctx.params.logo}, timeout: 20000});
                    //return ctx.params;
                    //random code
                    const code = Math.floor(100000 + Math.random() * 900000); //generate 6 digit password
                    ctx.params.code = code;

                    ctx.call("mail.sendMailCode", {email: ctx.params.email}, {meta:{code}, timeout: 120*1000});
                    let result = await this.actions.create(ctx.params);
                    return result;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        getShopByEmail: {
            rest: {
                method: "GET",
                path: "/email"
            },
            params: {
                email: "email",
            },
            async handler(ctx) {
                try {
                    //const data = this.adapter.find({ fields: ["name", "phone"], query: { email: ctx.params.email } });
                    return this.adapter.findOne({ query: { email: ctx.params.email } });
                } catch (error) {
                    console.log(error);
                }
            }
        },

        findRaw() {
            return this.adapter.db.query("SELECT * FROM stores").then(([res]) => res);
        },

        //Hoàng
        getStatusRegisterStore: {
			rest:
			{ 	method: "GET",
				path: "/getStatusRegisterStore"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("http://localhost:3005/storeService/getStatusRegisterStore/"+ new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.status;
			}
		},
		registerStore: {
			rest:
			{ 	method: "POST",
				path: "/registerStore"
			},
			params: {
				storeName : "string",
				phone : "string",
				email : "string",
				area : "string",
				province : "string",
				district : "string",
				address : "string",

			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.storeName, ctx.params.phone, ctx.params.email, ctx.params.area, ctx.params.province, ctx.params.district, ctx.params.address);

				const response = await fetch("http://localhost:3005/storeService/registerStore", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
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
