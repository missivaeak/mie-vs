/**
 * __tests__/Sound.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { StartingPoint } from "../src/classes/references/StartingPoint"
import { Place } from '../src/classes/references/Container'

/**
 * Variables
 */

let home: StartingPoint
const placeOptions = {
	type: "fake",
	route: "/fake",
	name: "Hittepå",
	description: "Påhittad plats"
}

/**
 * Tests
 */

beforeEach(function () {
	const options = {
		type: "start",
		route: "/",
		name: "Hem",
		description: "Hemskärmen"
	}
	home = new StartingPoint(options)
})

describe('StartingPoint', function () {
	describe('constructor', function () {
		it('successfully instansiates an object of the correct class', function () {
			expect(home).toBeInstanceOf(StartingPoint)
		})
	})

	describe('get places', function() {
		it('returns an array that is empty', function() {
			const places = home.places
			expect(Array.isArray(places)).toBe(true)
			expect(places).toHaveLength(0)
		})
	})

	describe('addPlace()', function() {
		it('adds and returns the place', function() {
			const place = new Place(placeOptions, "")
			home.addPlace(place)
			expect(home.places[0]).toBe(place)
		})
	})

	describe('remove place method', function() {
		const place = new Place({...placeOptions, name: "place3"}, "")

		beforeEach(function() {
			home.addPlace(new Place({...placeOptions, name: "place"}, ""))
			home.addPlace(new Place({...placeOptions, name: "place1"}, ""))
			home.addPlace(new Place({...placeOptions, name: "place2"}, ""))
			home.addPlace(place)
			home.addPlace(new Place({...placeOptions, name: "place4"}, ""))
		})

		describe('setup', function() {
			it('sets up the tests and have the correct number of places', function () {
				expect(home.places).toHaveLength(5)
			})
		})

		describe('removePlace()', function() {
			it('removes place by reference and gets removed from the object', function () {
				home.removePlace(place)
				expect(home.places).toHaveLength(4)
			})
		})

		describe('removePlaceByIndex()', function() {
			it('removes place by index and gets removed from the object and is returned', function () {
				const returnedPlace = home.removePlaceByIndex(3)
				expect(home.places).toHaveLength(4)
				expect(returnedPlace).toBe(place)
			})
		})
	})
})
