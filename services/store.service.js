"use strict";
const fetch = require("node-fetch");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "store",

	/**
	 * Settings
	 */
	settings: {
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
