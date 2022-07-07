"use strict";
const fetch = require("node-fetch");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "product",

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
		postProduct: {
			rest: {
				method: "POST",
				path: "/postProduct"
			},
			params: {
				productID: "string",
				productName: "string",
				price: "string",
				unit: "string",
				inventoryNumber: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.productID, ctx.params.productName, ctx.params.price, ctx.params.unit, ctx.params.inventoryNumber);

				const response = await fetch("localhost:3004/productService/postProduct", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		updateProduct: {
			rest:
			{ 	method: "POST",
				path: "/updateProduct"
			},
			params: {
				productID: "string",
				productName: "string",
				price: "string",
				unit: "string",
				inventoryNumber: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.productID, ctx.params.productName, ctx.params.price, ctx.params.unit, ctx.params.inventoryNumber);

				const response = await fetch("localhost:3004/productService/updateProduct", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		getCommentProduct: {
			rest:
			{ 	method: "GET",
				path: "/getCommentProduct"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("localhost:3004/productService/getCommentProduct/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.comment;
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
