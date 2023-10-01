// app/tests/Place.spec.ts

import { Folder } from "../models/Folder";
import { testingBlobs } from "./testingBlobs";

let myFolder;
let parent;

beforeEach(function () {
	parent = new Folder({
		type: "fake",
		route: "/fake",
		name: "Hittepå",
		description: "Påhittad plats"
	});

	const options = {
		type: "folder",
		route: "/school",
		name: "Skola",
		description: "Fnafhfnertsskolan",
		parent: parent
	};

	myFolder = new Folder(options, testingBlobs.image);
});

describe('Folder', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			assert.instanceOf(myFolder, Folder, "of the correct class");
		});
	});

	describe('getters', function() {
		describe('get image', function() {
			it('returns', function() {
				assert.strictEqual(myFolder.image, testingBlobs.image, "the image blob")
			});
		});

		describe('get scenes', function() {
			it('returns', function() {
				const scenes = myFolder.scenes;
				assert.typeOf(scenes, "array", "an array");
				assert.isEmpty(scenes, "that is empty");
			});
		});

		describe('get folders', function() {
			it('returns', function() {
				const folders = myFolder.folders;
				assert.typeOf(folders, "array", "an array");
				assert.isEmpty(folders, "that is empty");
			});
		});
	});

	describe('set image', function() {
		it('sets and returns', function() {
			myFolder.image = "fakeblob";
			assert.strictEqual(myFolder.image, "fakeblob", "the same string");
		});
	});

	describe('addScene()', function() {
		it('adds and returns', function() {
			const scene = {dummy: "scene"};
			myFolder.addScene(scene);
			assert.strictEqual(myFolder.scenes[0], scene, "the same scene")
		});
	});

	describe('remove scene method', function() {
		const scene = { dummy: "scene3" };

		beforeEach(function() {
			myFolder.addScene({dummy: "scene"});
			myFolder.addScene({dummy: "scene1"});
			myFolder.addScene({dummy: "scene2"});
			myFolder.addScene(scene);
			myFolder.addScene({dummy: "scene4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(myFolder.scenes, 5, "and has the right number of scenes")
			});
		});

		describe('removeScene()', function() {
			it('removes scene by reference', function () {
				myFolder.removeScene(scene)
				assert.lengthOf(myFolder.scenes, 4, "and gets removed from object")
			});
		});

		describe('removeSceneByIndex()', function() {
			it('removes scene by index', function () {
				const returnedScene = myFolder.removeSceneByIndex(3)
				assert.lengthOf(myFolder.scenes, 4, "and gets removed from object")
				assert.strictEqual(returnedScene, scene, "and is returned")
			});
		});
	});

	describe('addFolder()', function() {
		it('adds and returns', function() {
			const newFolder = {dummy: "folder"};
			myFolder.addFolder(newFolder);
			assert.strictEqual(myFolder.folders[0], newFolder, "the same folder")
		});
	});

	describe('remove folder method', function() {
		const newFolder = { dummy: "folder3" };

		beforeEach(function() {
			myFolder.addFolder({dummy: "folder"});
			myFolder.addFolder({dummy: "folder1"});
			myFolder.addFolder({dummy: "folder2"});
			myFolder.addFolder(newFolder);
			myFolder.addFolder({dummy: "folder4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(myFolder.folders, 5, "and has the right number of folders")
			});
		});

		describe('removeFolder()', function() {
			it('removes folder by reference', function () {
				myFolder.removeFolder(newFolder)
				assert.lengthOf(myFolder.folders, 4, "and gets removed from object")
			});
		});

		describe('removeFolderByIndex()', function() {
			it('removes folder by index', function () {
				const returnedFolder = myFolder.removeFolderByIndex(3)
				assert.lengthOf(myFolder.folders, 4, "and gets removed from object")
				assert.strictEqual(returnedFolder, newFolder, "and is returned")
			});
		});
	});
});
