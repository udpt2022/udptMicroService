"use strict";
const fetch = require("node-fetch");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "admin",

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

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		activateRegisterStore: {
			rest: {
				method: "POST",
				path: "/activateRegisterStore"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.id);

				const response = await fetch("http://localhost:3001/adminService/activateRegisterStore", {method: "POST", body: params});
				const data = await response.json();

				console.log(data);
				return data;
			}
		},
		acceptRegisterStore: {
			rest:
			{ 	method: "POST",
				path: "/acceptRegisterStore"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.id);

				const response = await fetch("http://localhost:3001/adminService/acceptRegisterStore", {method: "POST", body: params});
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
