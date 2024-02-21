/**
 * __tests__/Scene.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Scene } from "../src/classes/references/Scene"
import { ShapeInterface } from "../src/classes/shapes/ShapeInterface"
import { Reference } from '../src/classes/references/Reference'
import { ReferenceOptions } from '../src/classes/references/ReferenceOptions'
import { Region } from '../src/classes/references/Region'
import { testingBlobs } from "./testingBlobs.test"

/**
 * Variables
 */

let myScene: Scene
let myParent: Scene
let shape: ShapeInterface
let action: Reference

const referenceOptions: ReferenceOptions = {
	type: "",
	route: "",
	name: "",
	description: ""
}
const coords = {x: 4.42, y: 92.11}
const sceneOptions = {
	type: "fake",
	route: "/fake",
	name: "Hittepå",
	description: "Påhittad plats"
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
	myParent = new Scene(sceneOptions, "")

	const options = {
		type: "scene",
		route: "/scene222",
		name: "Klassrum",
		description: "Fnafhfnertsskolan klassrum 102",
		parent: myParent
	}

	myScene = new Scene(options, testingBlobs.image)
})

describe('Scene', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(myScene).toBeInstanceOf(Scene)
		})
	})

	describe('getters', function() {
		describe('get image', function() {
			it('returns the image blob', function() {
				expect(myScene.image).toEqual(testingBlobs.image)
			})
		})

		describe('get regions', function() {
			it('returns an array that is empty', function() {
				const regions = myScene.regions
				expect(Array.isArray(regions)).toBe(true)
				expect(regions).toHaveLength(0)
			})
		})
	})

	describe('set image', function() {
		it('sets and returns the same string', function() {
			myScene.image = "fakeblob"
			expect(myScene.image).toEqual("fakeblob")
		})
	})

	describe('addRegion()', function() {
		it('adds and returns the same region', function() {
			const region = new Region(coords, shape, action)
			myScene.addRegion(region)
			expect(myScene.regions[0]).toBe(region)
		})
	})

	describe('remove region method', function() {
		const region = new Region(coords, shape, action)

		beforeEach(function() {
			myScene.addRegion(new Region(coords, shape, action))
			myScene.addRegion(new Region(coords, shape, action))
			myScene.addRegion(new Region(coords, shape, action))
			myScene.addRegion(region)
			myScene.addRegion(new Region(coords, shape, action))
		})

		describe('setup', function() {
			it('sets up the tests and has the right number of regions', function () {
				expect(myScene.regions).toHaveLength(5)
			})
		})

		describe('removeRegion()', function() {
			it('removes region by reference and gets removed from the object', function () {
				myScene.removeRegion(region)
				expect(myScene.regions).toHaveLength(4)
			})
		})

		describe('removeRegionByIndex()', function() {
			it('removes region by index and gets removed from the object and is returned', function () {
				const returnedRegion = myScene.removeRegionByIndex(3)
				expect(myScene.regions).toHaveLength(4)
				expect(returnedRegion).toBe(region)
			})
		})
	})
})
