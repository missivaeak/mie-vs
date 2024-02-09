/**
 * __tests__/Reference.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { StartingPoint } from "../src/services/StartingPoint"

/**
 * Variables
 */

let myHome: StartingPoint

/**
 * Tests
 */

beforeEach(function () {
	const options = {
		type: "start",
		route: "/",
		name: "Start",
		description: "Hemskärmen"
	}
	myHome = new StartingPoint(options)
})

describe('Testing abstract class Reference via StartingPoint', function () {
	describe('getters', function () {
		describe('get type', function() {
			it('returns the correct string', function() {
				expect(myHome.type).toEqual("start")
			})
		})
		
		describe('get route', function() {
			it('returns the correct string', function() {
				expect(myHome.route).toEqual("/")
			})
		})
		
		describe('get name', function() {
			it('returns the correct string', function() {
				expect(myHome.name).toEqual("Start")
			})
		})

		describe('get description', function() {
			it('returns the correct string', function() {
				expect(myHome.description).toEqual("Hemskärmen")
			})
		})

		describe('get parent', function() {
			it('returns a StartingPoint object equal to itself', function() {
				const parent = myHome.parent
				expect(parent).toBeInstanceOf(StartingPoint)
				expect(parent).toBe(myHome)
			})
		})
	})

	describe('setters', function () {
		describe('set type', function() {
			it('sets and returns correct content', function() {
				myHome.type = "annat"
				expect(myHome.type).toEqual("annat")
			})
		})
		
		describe('set route', function() {
			it('sets and returns correct content', function() {
				myHome.route = "/annan"
				expect(myHome.route).toEqual("/annan")
			})
		})
		
		describe('set name', function() {
			it('sets and returns correct content', function() {
				myHome.name = "Startmavid"
				expect(myHome.name).toEqual("Startmavid")
			})
		})

		describe('set description', function() {
			it('sets and returns correct content', function() {
				myHome.description = "Inte hemskärmen"
				expect(myHome.description).toEqual("Inte hemskärmen")
			})
		})

		describe('set parent', function() {
			it('sets and returns a StartingPoint object not equal to itself', function() {
				const options = {
					type: "groan",
					route: "/groan",
					name: "Jämmer",
					description: "Jämskärmen"
				}
				myHome.parent = new StartingPoint(options)
				expect(myHome.parent).toBeInstanceOf(StartingPoint)
				expect(myHome.parent).not.toBe(myHome)
			})
		})
	})
})
