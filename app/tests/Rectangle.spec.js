// app/tests/Circle.spec.ts

import { Rectangle } from "../models/Rectangle";

let myRectangle;

beforeEach(function () {
	const options = {
		width: 10,
		height: 22
	};

	myRectangle = new Rectangle(options);
});

describe('Rectangle', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myRectangle, Rectangle, "of the correct class");
		});
	});

	describe('get properties', function() {
		it('returns', function() {
			assert.strictEqual(myRectangle.properties.width, 10, "the width")
			assert.strictEqual(myRectangle.properties.height, 22, "the height")
		});
	});

	describe('set properties', function() {
		it('sets and returns', function() {
			myRectangle.properties = {
				width: 100,
				height: 2
			};
			assert.strictEqual(myRectangle.properties.width, 100, "the same width");
			assert.strictEqual(myRectangle.properties.height, 2, "the same height");
		});
	});

	describe('checkClick()', function() {
		it('returns true', function () {
			const click = {
				x: 3,
				y: 22
			};
			const result = myRectangle.checkClick(click);
			assert.isTrue(result, "inside the rectangle");
		});

		describe('returns false', function() {
			it('with negative x value', function () {
				const click = {
					x: -13,
					y: 2
				};
				const result = myRectangle.checkClick(click);
				assert.isNotTrue(result, "correctly");
			});

			it('with negative y value', function () {
				const click = {
					x: 13,
					y: -2
				};
				const result = myRectangle.checkClick(click);
				assert.isNotTrue(result, "correctly");
			});

			it('with high x value', function () {
				const click = {
					x: 222,
					y: 2
				};
				const result = myRectangle.checkClick(click);
				assert.isNotTrue(result, "correctly");
			});

			it('with high y value', function () {
				const click = {
					x: 13,
					y: 2222
				};
				const result = myRectangle.checkClick(click);
				assert.isNotTrue(result, "correctly");
			});
		});
	});
});
