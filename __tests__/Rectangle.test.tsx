/**
 * __tests__/Rectangle.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Rectangle } from "../src/classes/visualScenes/Rectangle"

/**
 * Variables
 */

let myRectangle: Rectangle

/**
 * Tests
 */

beforeEach(function () {
	const options = {
		width: 10,
		height: 22
	}

	myRectangle = new Rectangle(options)
})

describe('Rectangle', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(myRectangle).toBeInstanceOf(Rectangle)
		})
	})

	describe('get properties', function() {
		it('returns the width and height', function() {
			expect(myRectangle.properties.width).toEqual(10)
			expect(myRectangle.properties.height).toEqual(22)
		})
	})

	describe('set properties', function() {
		it('sets and returns the same width and height', function() {
			myRectangle.properties = {
				width: 100,
				height: 2
			}
			expect(myRectangle.properties.width).toEqual(100)
			expect(myRectangle.properties.height).toEqual(2)
		})
	})

	describe('checkClick()', function() {
		it('returns true inside the rectangle', function () {
			const click = {
				x: 3,
				y: 22
			}
			const result = myRectangle.checkClick(click)
			expect(result).toBe(true)
		})

		describe('returns false', function() {
			it('with negative x value', function () {
				const click = {
					x: -13,
					y: 2
				}
				const result = myRectangle.checkClick(click)
				expect(result).toBe(false)
			})

			it('with negative y value', function () {
				const click = {
					x: 13,
					y: -2
				}
				const result = myRectangle.checkClick(click)
				expect(result).toBe(false)
			})

			it('with high x value', function () {
				const click = {
					x: 222,
					y: 2
				}
				const result = myRectangle.checkClick(click)
				expect(result).toBe(false)
			})

			it('with high y value', function () {
				const click = {
					x: 13,
					y: 2222
				}
				const result = myRectangle.checkClick(click)
				expect(result).toBe(false)
			})
		})
	})
})
