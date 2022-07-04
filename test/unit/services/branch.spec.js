"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/branch.service");

describe("Test 'branch' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'branch.hello' action", () => {

		it("should return with 'Hello Moleculer'", async () => {
			const res = await broker.call("branch.hello");
			expect(res).toBe("Hello Moleculer");
		});

	});

	describe("Test 'branch.welcome' action", () => {

		it("should return with 'Welcome'", async () => {
			const res = await broker.call("branch.welcome", { name: "Adam" });
			expect(res).toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("branch.welcome");
			} catch(err) {
				expect(err).toBeInstanceOf(ValidationError);
			}
		});

	});

});

