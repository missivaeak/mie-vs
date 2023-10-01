// app/tests/Place.spec.ts

import { Place } from "../models/Place";
import { testingBlobs } from "./testingBlobs";

let place;
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

	place = new Place(options, testingBlobs.image);
});

describe('Place', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(place, Place, "of the correct class");
		});
	});

	describe('getters', function() {
		describe('get image', function() {
			it('returns', function() {
				assert.strictEqual(place.image, testingBlobs.image, "the image blob")
			});
		});

		describe('get scenes', function() {
			it('returns', function() {
				const scenes = place.scenes;
				assert.typeOf(scenes, "array", "an array");
				assert.isEmpty(scenes, "that is empty");
			});
		});
	});

	describe('set image', function() {
		it('sets and returns', function() {
			place.image = "fakeblob";
			assert.strictEqual(place.image, "fakeblob", "the same string");
		});
	});

	describe('addScene()', function() {
		it('adds and returns', function() {
			const scene = {dummy: "scene"};
			place.addScene(scene);
			assert.strictEqual(place.scenes[0], scene, "the same scene")
		});
	});

	describe('remove scene method', function() {
		const scene = { dummy: "scene3" };

		beforeEach(function() {
			place.addScene({dummy: "scene"});
			place.addScene({dummy: "scene1"});
			place.addScene({dummy: "scene2"});
			place.addScene(scene);
			place.addScene({dummy: "scene4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(place.scenes, 5, "and has the right number of scenes")
			});
		});

		describe('removeScene()', function() {
			it('removes scene by reference', function () {
				place.removeScene(scene)
				assert.lengthOf(place.scenes, 4, "and gets removed from object")
			});
		});

		describe('removeSceneByIndex()', function() {
			it('removes scene by index', function () {
				const returnedScene = place.removeSceneByIndex(3)
				assert.lengthOf(place.scenes, 4, "and gets removed from object")
				assert.strictEqual(returnedScene, scene, "and is returned")
			});
		});
	});
});
