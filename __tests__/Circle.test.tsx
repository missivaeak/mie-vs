/**
 * __tests__/Circle.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals';
import { Circle } from "../src/services/Circle"

/**
 * Variables
 */

let myCircle: Circle

/**
 * Tests
 */

beforeEach(function () {
	const options = {
		radius: 10
	}

	myCircle = new Circle(options)
});

describe('Circle', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(myCircle).toBeInstanceOf(Circle)
		})
	})

	describe('get properties', function() {
		it('returns the radius', function() {
			expect(myCircle.properties.radius).toEqual(10)
		})
	})

	describe('set properties', function() {
		it('sets and returns the same number', function() {
			myCircle.properties = { radius: 5 }
			expect(myCircle.properties.radius).toEqual(5)
		})
	})

	describe('checkClick()', function() {
		it('returns true inside the circle', function () {
			const click = {
				x: 3,
				y: -2
			}
			const result = myCircle.checkClick(click);
			expect(result).toBe(true)
		})

		it('returns false outside the circle', function () {
			const click = {
				x: 13,
				y: -2
			}
			const result = myCircle.checkClick(click)
			expect(result).toBe(false)
		})
	})
})
