// app/tests/Reference.spec.ts

import { StartingPoint } from "../models/StartingPoint";

let myHome;

beforeEach(function () {
	const options = {
		type: "start",
		route: "/",
		name: "Start",
		description: "Hemskärmen"
	};
	myHome = new StartingPoint(options);
});

describe('Testing abstract class Reference via StartingPoint', function () {
	describe('getters', function () {
		describe('get type', function() {
			it('returns', function() {
				const type = myHome.type;
				assert.isString(type, "a string");
				assert.strictEqual(type, "start", "with correct content");
			});
		});
		
		describe('get route', function() {
			it('returns', function() {
				const route = myHome.route;
				assert.isString(route, "a string");
				assert.strictEqual(route, "/", "with correct content");
			});
		});
		
		describe('get name', function() {
			it('returns', function() {
				const name = myHome.name;
				assert.isString(name, "a string");
				assert.strictEqual(name, "Start", "with correct content");
			});
		});

		describe('get description', function() {
			it('returns', function() {
				const description = myHome.description;
				assert.isString(description, "a string");
				assert.strictEqual(description, "Hemskärmen", "with correct content");
			});
		});

		describe('get parent', function() {
			it('returns', function() {
				const parent = myHome.parent;
				assert.instanceOf(parent, StartingPoint, "a StartingPoint object");
				assert.strictEqual(parent, myHome, "equal to itself");
			});
		});
	});

	describe('setters', function () {
		describe('set type', function() {
			it('sets and returns', function() {
				myHome.type = "annat";
				assert.strictEqual(myHome.type, "annat", "correct content");
			});
		});
		
		describe('set route', function() {
			it('sets and returns', function() {
				myHome.route = "/annan";
				assert.strictEqual(myHome.route, "/annan", "correct content");
			});
		});
		
		describe('set name', function() {
			it('sets and returns', function() {
				myHome.name = "Startmavid";
				assert.strictEqual(myHome.name, "Startmavid", "with correct content");
			});
		});

		describe('set description', function() {
			it('sets and returns', function() {
				myHome.description = "Inte hemskärmen";
				assert.strictEqual(myHome.description, "Inte hemskärmen", "correct content");
			});
		});

		describe('set parent', function() {
			it('sets and returns', function() {
				const options = {
					type: "groan",
					route: "/groan",
					name: "Jämmer",
					description: "Jämskärmen"
				};
				myHome.parent = new StartingPoint(options);
				assert.instanceOf(myHome.parent, StartingPoint, "a StartingPoint object");
				assert.notStrictEqual(myHome.parent, myHome, "not equal to itself");
			});
		});
	});
});
