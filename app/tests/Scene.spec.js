// app/tests/Scene.spec.ts

import { Scene } from "../models/Scene";
import { testingBlobs } from "./testingBlobs";

let myScene;
let myParent;

beforeEach(function () {
	myParent = new Scene({
		type: "fake",
		route: "/fake",
		name: "Hittepå",
		description: "Påhittad plats"
	});

	const options = {
		type: "scene",
		route: "/scene222",
		name: "Klassrum",
		description: "Fnafhfnertsskolan klassrum 102",
		parent: myParent
	};

	myScene = new Scene(options, testingBlobs.image);
});

describe('Scene', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myScene, Scene, "of the correct class");
		});
	});

	describe('getters', function() {
		describe('get image', function() {
			it('returns', function() {
				assert.strictEqual(myScene.image, testingBlobs.image, "the image blob")
			});
		});

		describe('get regions', function() {
			it('returns', function() {
				const regions = myScene.regions;
				assert.typeOf(regions, "array", "an array");
				assert.isEmpty(regions, "that is empty");
			});
		});
	});

	describe('set image', function() {
		it('sets and returns', function() {
			myScene.image = "fakeblob";
			assert.strictEqual(myScene.image, "fakeblob", "the same string");
		});
	});

	describe('addRegion()', function() {
		it('adds and returns', function() {
			const region = {dummy: "region"};
			myScene.addRegion(region);
			assert.strictEqual(myScene.regions[0], region, "the same region")
		});
	});

	describe('remove region method', function() {
		const region = { dummy: "region3" };

		beforeEach(function() {
			myScene.addRegion({dummy: "region"});
			myScene.addRegion({dummy: "region1"});
			myScene.addRegion({dummy: "region2"});
			myScene.addRegion(region);
			myScene.addRegion({dummy: "region4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(myScene.regions, 5, "and has the right number of regions")
			});
		});

		describe('removeRegion()', function() {
			it('removes region by reference', function () {
				myScene.removeRegion(region)
				assert.lengthOf(myScene.regions, 4, "and gets removed from object")
			});
		});

		describe('removeRegionByIndex()', function() {
			it('removes region by index', function () {
				const returnedRegion = myScene.removeRegionByIndex(3)
				assert.lengthOf(myScene.regions, 4, "and gets removed from object")
				assert.strictEqual(returnedRegion, region, "and is returned")
			});
		});
	});
});
