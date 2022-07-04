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
				return ctx.params.id;
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
				return ctx.params.id;
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
