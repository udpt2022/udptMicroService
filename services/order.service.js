"use strict";
const fetch = require("node-fetch");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "order",

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
		listProductByUser: {
			rest: {
				method: "GET",
				path: "/listProductByUser"
			},
			params: {
				id: "string"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},
		listAllProduct: {
			rest: {
				method: "GET",
				path: "/listAllProduct"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},
		addProduct: {
			rest: {
				method: "POST",
				path: "/addProduct"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},
		listCartByUser: {
			rest:
			{ 	method: "GET",
				path: "/listCartByUser"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("http://localhost:3003/cart/listCartByUser/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.cartList;
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
