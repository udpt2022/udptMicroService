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
				//params.append(ctx.params.productID, ctx.params.productName, ctx.params.price, ctx.params.unit, ctx.params.inventoryNumber);
				params.append("productID",ctx.params.productID);
				params.append("productName",ctx.params.productName);
				params.append("price",ctx.params.price);
				params.append("unit",ctx.params.unit);
				params.append("inventoryNumber",ctx.params.inventoryNumber);
				console.log(params);
				const response = await fetch("http://localhost:3004/productService/postProduct", {method: "POST", body: params});
				const data = await response.json();
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
				params.append("productID",ctx.params.productID);
				params.append("productName",ctx.params.productName);
				params.append("price",ctx.params.price);
				params.append("unit",ctx.params.unit);
				params.append("inventoryNumber",ctx.params.inventoryNumber);
				//ctx.params.productID, ctx.params.productName, ctx.params.price, ctx.params.unit, ctx.params.inventoryNumber
				console.log(ctx.params.productID);
				const response = await fetch("http://localhost:3004/productService/updateProduct", {method: "POST", body: params});
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
				const response = await fetch("http://localhost:3004/productService/getCommentProduct/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.comment;
			}
		},
		listAll: {
			rest:
			{ 	method: "GET",
				path: "/listAll"
			},
			async handler() {
				const response = await fetch("http://localhost:3004/productService/listAll");
				const data = await response.json();
				return data.productList;
			}
		},
		listByCategory: {
			rest:
			{ 	method: "GET",
				path: "/listByCategory"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("http://localhost:3004/productService/listByCategory/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.productList;
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
