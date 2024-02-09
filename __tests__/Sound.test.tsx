/**
 * __tests__/Sound.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Sound } from "../src/services/Sound"
import { testingBlobs } from "./testingBlobs.test"

/**
 * Variables
 */

let mySound: Sound
const soundOptions = {
	type: "fake",
	route: "/fake",
	name: "Hittepå",
	description: "Påhittad"
}

/**
 * Tests
 */

beforeEach(function () {
	const myParent = new Sound(soundOptions, "")

	const options = {
		type: "sound",
		route: "/sound123",
		name: "Bänk",
		description: "Min skolbänk",
		parent: myParent
	}

	mySound = new Sound(options, testingBlobs.audio)
})

describe('Sound', function() {
	describe('constructor', function() {
		it('successfully instansiates an object of the correct class', function() {
			expect(mySound).toBeInstanceOf(Sound)
		})
	})

	describe('get audio', function() {
		it('returns the audio blob', function() {
			expect(mySound.audio).toEqual(testingBlobs.audio)
		})
	})

	describe('set audio', function() {
		it('sets and returns the same string', function() {
			mySound.audio = "fakeblob"
			expect(mySound.audio).toEqual("fakeblob")
		})
	})
})
