// app/tests/Place.spec.ts

import { Place } from "../models/Place";
import { testingBlobs } from "./testingBlobs";

let myPlace;
let parent;

beforeEach(function () {
	parent = new Place({
		type: "fake",
		route: "/fake",
		name: "Hittepå",
		description: "Påhittad plats"
	});

	const options = {
		type: "place",
		route: "/school",
		name: "Skola",
		description: "Fnafhfnertsskolan",
		parent: parent
	};

	myPlace = new Place(options, testingBlobs.image);
});

describe('Place', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myPlace, Place, "of the correct class");
		});
	});

	describe('getters', function() {
		describe('get image', function() {
			it('returns', function() {
				assert.strictEqual(myPlace.image, testingBlobs.image, "the image blob")
			});
		});

		describe('get scenes', function() {
			it('returns', function() {
				const scenes = myPlace.scenes;
				assert.typeOf(scenes, "array", "an array");
				assert.isEmpty(scenes, "that is empty");
			});
		});
	});

	describe('set image', function() {
		it('sets and returns', function() {
			myPlace.image = "fakeblob";
			assert.strictEqual(myPlace.image, "fakeblob", "the same string");
		});
	});

	describe('addScene()', function() {
		it('adds and returns', function() {
			const scene = {dummy: "scene"};
			myPlace.addScene(scene);
			assert.strictEqual(myPlace.scenes[0], scene, "the same scene")
		});
	});

	describe('remove scene method', function() {
		const scene = { dummy: "scene3" };

		beforeEach(function() {
			myPlace.addScene({dummy: "scene"});
			myPlace.addScene({dummy: "scene1"});
			myPlace.addScene({dummy: "scene2"});
			myPlace.addScene(scene);
			myPlace.addScene({dummy: "scene4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(myPlace.scenes, 5, "and has the right number of scenes")
			});
		});

		describe('removeScene()', function() {
			it('removes scene by reference', function () {
				myPlace.removeScene(scene)
				assert.lengthOf(myPlace.scenes, 4, "and gets removed from object")
			});
		});

		describe('removeSceneByIndex()', function() {
			it('removes scene by index', function () {
				const returnedScene = myPlace.removeSceneByIndex(3)
				assert.lengthOf(myPlace.scenes, 4, "and gets removed from object")
				assert.strictEqual(returnedScene, scene, "and is returned")
			});
		});
	});
});
