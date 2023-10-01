// app/tests/Place.spec.ts

import { Region } from "../models/Region";

let myRegion;
let shape;
let action;

beforeEach(function () {
	const coords = {x: 4.42, y: 92.11};
	shape = {shape: "dummy"};
	action = {action: "dummy"};
	// coords: {x: number, y: number}, shape: ShapeInterface, action: Reference
	myRegion = new Region(coords, shape, action);
});

describe('Region', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myRegion, Region, "of the correct class");
		});
	});

	describe('getters', function() {
		describe('get coords', function() {
			it('returns', function() {
				const coords = myRegion.coords;
				assert.isObject(coords, "an object");
				assert.strictEqual(coords.x, 4.42, "with correct x coordinate");
				assert.strictEqual(coords.y, 92.11, "and correct y coordinate");
			});
		});

		describe('get shape', function() {
			it('returns', function() {
				const returnedShape = myRegion.shape;
				assert.strictEqual(returnedShape, shape, "the set shape");
			});
		});

		describe('get action', function() {
			it('returns', function() {
				const returnedAction = myRegion.action;
				assert.strictEqual(returnedAction, action, "the set action");
			});
		});
	});

	describe('setters', function() {
		describe('set coords', function() {
			it('sets and returns', function() {
				myRegion.coords = {x: 22.19, y: 32.11};
				assert.strictEqual(myRegion.coords.x, 22.19, "correct x");
				assert.strictEqual(myRegion.coords.y, 32.11, "and correct y");
			});
		});
		
		describe('set shape', function() {
			it('sets and returns', function() {
				const newShape = {shape: "dummy2"};

				myRegion.shape = newShape;
				assert.strictEqual(myRegion.shape, newShape, "correct shape");
			});
		});
		
		describe('set action', function() {
			it('sets and returns', function() {
				const newAction = {action: "dummy2"};

				myRegion.action = newAction;
				assert.strictEqual(myRegion.action, newAction, "correct action");
			});
		});
	});

});
