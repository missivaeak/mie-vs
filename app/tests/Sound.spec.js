// app/tests/Place.spec.ts

import { Sound } from "../models/Sound";
import { testingBlobs } from "./testingBlobs";

let mySound;

beforeEach(function () {
	const myParent = new Sound({
		type: "fake",
		route: "/fake",
		name: "Hittepå",
		description: "Påhittad"
	});

	const options = {
		type: "sound",
		route: "/sound123",
		name: "Bänk",
		description: "Min skolbänk",
		parent: myParent
	};

	mySound = new Sound(options, testingBlobs.audio);
});

describe('Sound', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(mySound, Sound, "of the correct class");
		});
	});

	describe('get audio', function() {
		it('returns', function() {
			assert.strictEqual(mySound.audio, testingBlobs.audio, "the audio blob")
		});
	});

	describe('set audio', function() {
		it('sets and returns', function() {
			mySound.audio = "fakeblob";
			assert.strictEqual(mySound.audio, "fakeblob", "the same string");
		});
	});
});
