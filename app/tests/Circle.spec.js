// app/tests/Circle.spec.ts

import { Circle } from "../models/Circle";

let myCircle;

beforeEach(function () {
	const options = {
		radius: 10
	};

	myCircle = new Circle(options);
});

describe('Circle', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myCircle, Circle, "of the correct class");
		});
	});

	describe('get properties', function() {
		it('returns', function() {
			assert.strictEqual(myCircle.properties.radius, 10, "the radius")
		});
	});

	describe('set properties', function() {
		it('sets and returns', function() {
			myCircle.properties = { radius: 5 };
			assert.strictEqual(myCircle.properties.radius, 5, "the same number");
		});
	});

	describe('checkClick()', function() {
		it('returns true', function () {
			const click = {
				x: 3,
				y: -2
			};
			const result = myCircle.checkClick(click);
			assert.isTrue(result, "inside the circle");
		});

		it('returns false', function () {
			const click = {
				x: 13,
				y: -2
			};
			const result = myCircle.checkClick(click);
			assert.isNotTrue(result, "outside the circle");
		});
	});
});
