/**
 * __tests__/Region.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Region } from "../src/services/Region"
import { Reference } from "../src/services/Reference"
import { ReferenceOptions } from '../src/services/ReferenceOptions'
import { ShapeInterface } from "../src/services/ShapeInterface"

/**
 * Variables
 */

let myRegion: Region
let shape: ShapeInterface
let action: Reference

const referenceOptions: ReferenceOptions = {
	type: "",
	route: "",
	name: "",
	description: ""
}

class ShapeFixture implements ShapeInterface {
	checkClick(coords: { x: number, y: number }): Boolean {
		return true
	}
	_properties: Object = {
		dummy: "value"
	}
}

/**
 * Tests
 */

beforeEach(function () {
	const coords = {x: 4.42, y: 92.11}
	shape = new ShapeFixture()
	action = new class extends Reference {} (referenceOptions)
	myRegion = new Region(coords, shape, action)
})

describe('Region', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(myRegion).toBeInstanceOf(Region)
		})
	})

	describe('getters', function() {
		describe('get coords', function() {
			it('returns an object with correct x and y values', function() {
				const coords = myRegion.coords
				expect(typeof coords).toEqual("object")
				expect(coords.x).toEqual(4.42)
				expect(coords.y).toEqual(92.11)
			})
		})

		describe('get shape', function() {
			it('returns the set shape', function() {
				const returnedShape = myRegion.shape
				expect(returnedShape).toBe(shape)
			})
		})

		describe('get action', function() {
			it('returns the set action', function() {
				const returnedAction = myRegion.action
				expect(returnedAction).toBe(action)
			})
		})
	})

	describe('setters', function() {
		describe('set coords', function() {
			it('sets and returns correct x and y', function() {
				myRegion.coords = {x: 22.19, y: 32.11}
				expect(myRegion.coords.x).toEqual(22.19)
				expect(myRegion.coords.y).toEqual(32.11)
			})
		})
		
		describe('set shape', function() {
			it('sets and returns correct shape', function() {
				const newShape = new ShapeFixture()

				myRegion.shape = newShape
				expect(myRegion.shape).toBe(newShape)
			})
		})
		
		describe('set action', function() {
			it('sets and returns', function() {
				const newAction = new class extends Reference {} (referenceOptions)

				myRegion.action = newAction
				expect(myRegion.action).toBe(newAction)
			})
		})
	})
})
