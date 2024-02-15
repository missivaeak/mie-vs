/**
 * __tests__/Place.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Place } from "../src/classes/visualScenes/Place"
import { Scene } from "../src/classes/visualScenes/Scene"
import { testingBlobs } from "./testingBlobs.test"

/**
 * Variables
 */

let myPlace: Place
let parent: Place
const sceneOptions = {
	type: "fake",
	route: "/fake",
	name: "Hittepå",
	description: "Påhittad scen"
}

/**
 * Tests
 */

beforeEach(function () {
	parent = new Place({
		type: "fake",
		route: "/fake",
		name: "Hittepå",
		description: "Påhittad plats"
	}, "")

	const options = {
		type: "place",
		route: "/school",
		name: "Skola",
		description: "Fnafhfnertsskolan",
		parent: parent
	}

	myPlace = new Place(options, testingBlobs.image)
})

describe('Place', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(myPlace).toBeInstanceOf(Place)
		})
	})

	describe('getters', function() {
		describe('get image', function() {
			it('returns the image blob', function() {
				expect(myPlace.image).toEqual(testingBlobs.image)
			})
		})

		describe('get scenes', function() {
			it('returns an array that is empty', function() {
				const scenes = myPlace.scenes
				expect(Array.isArray(scenes)).toBe(true)
				expect(scenes).toHaveLength(0)
			})
		})
	})

	describe('set image', function() {
		it('sets and returns the same string', function() {
			myPlace.image = "fakeblob"
			expect(myPlace.image).toEqual("fakeblob")
		})
	})

	describe('addScene()', function() {
		it('adds and returns the same scene', function() {
			const scene = new Scene(sceneOptions, "")
			myPlace.addScene(scene)
			expect(myPlace.scenes[0]).toBe(scene)
		})
	})

	describe('remove scene method', function() {
		const scene = new Scene({...sceneOptions, name: "scene3"}, "")

		beforeEach(function() {
			myPlace.addScene(new Scene({...sceneOptions, name: "scene"}, ""))
			myPlace.addScene(new Scene({...sceneOptions, name: "scene1"}, ""))
			myPlace.addScene(new Scene({...sceneOptions, name: "scene2"}, ""))
			myPlace.addScene(scene)
			myPlace.addScene(new Scene({...sceneOptions, name: "scene4"}, ""))
		})

		describe('setup', function() {
			it('sets up the tests and has the right number of scenes', function () {
				expect(myPlace.scenes).toHaveLength(5)
			})
		})

		describe('removeScene()', function() {
			it('removes scene by reference and gets removed from object', function () {
				myPlace.removeScene(scene)
				expect(myPlace.scenes).toHaveLength(4)
			})
		})

		describe('removeSceneByIndex()', function() {
			it('removes scene by index and gets removed from object and is returned', function () {
				const returnedScene = myPlace.removeSceneByIndex(3)
				expect(myPlace.scenes).toHaveLength(4)
				expect(returnedScene).toBe(scene)
			})
		})
	})
})
