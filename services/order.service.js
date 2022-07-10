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
		addProductToCart: {
			rest: {
				method: "POST",
				path: "/cart/addProductToCart"
			},
			params: {
				productID: "string",
				productName: "string",
				price: "string",
				quantity: "string",
				cusID: "string",
			},
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.productID, ctx.params.productName, ctx.params.quantity, ctx.params.cusID);

				const response = await fetch("http://localhost:3003/cart/addProductToCart", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		removeProductFromCart: {
			rest: {
				method: "POST",
				path: "/cart/removeProductFromCart"
			},
			params: {
				productID: "string",
				cusID: "string",
			},
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.productID,  ctx.params.cusID);
				const response = await fetch("http://localhost:3003/cart/removeProductFromCart", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		addQuantity: {
			rest: {
				method: "POST",
				path: "/cart/addQuantity"
			},
			params: {
				productID: "string",
				cusID: "string",
			},
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.productID,  ctx.params.cusID);

				const response = await fetch("http://localhost:3003/cart/addQuantity", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		listByUserID: {
			rest: {
				method: "GET",
				path: "/cart/listByUserID"
			},
			params: {
				id: "string"
			},
			async handler(ctx) {
				const response = await fetch("http://localhost:3003/cart/listCartByUser/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.cartList;
			}
		},
		add: {
			rest:
			{ 	method: "POST",
				path: "/orderTicket/addr"
			},
			params: {
				cusID: "string",
				status: "string",
				totalPrice: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.cusID,  ctx.params.status, ctx.params.totalPrice);

				const response = await fetch("http://localhost:3003/orderTicket/add", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		listOrderByUserID: {
			rest:
			{ 	method: "GET",
				path: "/orderTicket/listByUserID"
			},
			params: {
				id: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("http://localhost:3003/orderTicket/listByUserID/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				console.log(ctx.params.id);
				return data.orderTicketList;
			}
		},
		listAll: {
			rest:
			{ 	method: "GET",
				path: "/orderTicket/listAll"
			},
			async handler() {
				const response = await fetch("http://localhost:3003/orderTicket/listAll");
				const data = await response.json();
				return data.orderTicketList;
			}
		},
		addCheckOut: {
			rest:
			{ 	method: "GET",
				path: "/checkOut/add"
			},
			params: {
				cusID: "string",
				status: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const params = new URLSearchParams();
				params.append(ctx.params.cusID,  ctx.params.status);

				const response = await fetch("http://localhost:3003/checkOut/add ", {method: "POST", body: params});
				const data = await response.json();
				console.log(data);
				return data;
			}
		},
		listCheckOutByUserID: {
			rest:
			{ 	method: "GET",
				path: "/checkOut/listByUserID"
			},
			params: {
				id: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const response = await fetch("http://localhost:3003/checkOut/listByUserID/" + new URLSearchParams({
					id: ctx.params.id,
				}));
				const data = await response.json();
				return data.checkOutList;
			}
		},
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
