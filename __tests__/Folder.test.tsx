/**
 * __tests__/Folder.test.tsx
 */

import { it, beforeEach, describe, expect } from '@jest/globals'
import { Folder } from "../src/classes/visualScenes/Folder"
import { Scene } from "../src/classes/references/Scene"
import { testingBlobs } from "./testingBlobs.test"

/**
 * Variables
 */

let myFolder: Folder
let parent: Folder

const sceneOptions = {
	type: "fake",
	route: "/fake",
	name: "Hittepå",
	description: "Påhittad scen"
}
const folderOptions = {
	type: "fake",
	route: "/fake",
	name: "fakefolder",
	description: "Påhittad mapp"
}

/**
 * Tests
 */

beforeEach(function () {
	parent = new Folder(folderOptions)

	const options = {
		type: "folder",
		route: "/school",
		name: "Skola",
		description: "Fnafhfnertsskolan",
		parent: parent
	}

	myFolder = new Folder(options, testingBlobs.image)
})

describe('Folder', function() {
	describe('constructor', function() {
		it('successfully instansiates an object', function() {
			expect(myFolder).toBeInstanceOf(Folder)
		})
	})

	describe('getters', function() {
		describe('get image', function() {
			it('returns the image blob', function() {
				expect(myFolder.image).toEqual(testingBlobs.image)
			})
		})

		describe('get scenes', function() {
			it('returns an array that is empty', function() {
				const scenes = myFolder.scenes
				expect(Array.isArray(scenes)).toBe(true)
				expect(scenes).toHaveLength(0)
			})
		})

		describe('get folders', function() {
			it('returns an array that is empty', function() {
				const folders = myFolder.folders
				expect(Array.isArray(folders)).toBe(true)
				expect(folders).toHaveLength(0)
			})
		})
	})

	describe('set image', function() {
		it('sets and returns the same string', function() {
			myFolder.image = "fakeblob"
			expect(myFolder.image).toEqual("fakeblob")
		})
	})

	describe('addScene()', function() {
		it('adds and returns the same scene', function() {
			const scene = new Scene(sceneOptions, "")
			myFolder.addScene(scene)
			expect(myFolder.scenes[0]).toBe(scene)
		})
	})

	describe('remove scene method', function() {
		const scene = new Scene({...sceneOptions, name: "scene3"}, "")

		beforeEach(function() {
			myFolder.addScene(new Scene({...sceneOptions, name: "scene"}, ""))
			myFolder.addScene(new Scene({...sceneOptions, name: "scene1"}, ""))
			myFolder.addScene(new Scene({...sceneOptions, name: "scene2"}, ""))
			myFolder.addScene(scene)
			myFolder.addScene(new Scene({...sceneOptions, name: "scene4"}, ""))
		})

		describe('setup', function() {
			it('sets up the tests and has the right number of scenes', function () {
				expect(myFolder.scenes).toHaveLength(5)
			})
		})

		describe('removeScene()', function() {
			it('removes scene by reference and gets removed from object', function () {
				myFolder.removeScene(scene)
				expect(myFolder.scenes).toHaveLength(4)
			})
		})

		describe('removeSceneByIndex()', function() {
			it(
				'removes scene by index and gets removed from object and is returned',
				function () {
					const returnedScene = myFolder.removeSceneByIndex(3)
					expect(myFolder.scenes).toHaveLength(4)
					expect(returnedScene).toBe(scene)
			})
		})
	})

	describe('addFolder()', function() {
		it('adds and returns the same folder', function() {
			const newFolder = new Folder(folderOptions)
			myFolder.addFolder(newFolder)
			expect(myFolder.folders[0]).toBe(newFolder)
		})
	})

	describe('remove folder method', function() {
		const newFolder = new Folder({...folderOptions, name: "folder3"})

		beforeEach(function() {
			myFolder.addFolder(new Folder({...folderOptions, name: "folder"}))
			myFolder.addFolder(new Folder({...folderOptions, name: "folder1"}))
			myFolder.addFolder(new Folder({...folderOptions, name: "folder2"}))
			myFolder.addFolder(newFolder)
			myFolder.addFolder(new Folder({...folderOptions, name: "folder4"}))
		})

		describe('setup', function() {
			it('sets up the tests and has the right number of folders', function () {
				expect(myFolder.folders).toHaveLength(5)
			})
		})

		describe('removeFolder()', function() {
			it('removes folder by reference and gets removed from object', function () {
				myFolder.removeFolder(newFolder)
				expect(myFolder.folders).toHaveLength(4)
			})
		})

		describe('removeFolderByIndex()', function() {
			it('removes folder by index and gets removed from object and is returned', function () {
				const returnedFolder = myFolder.removeFolderByIndex(3)
				expect(myFolder.folders).toHaveLength(4)
				expect(returnedFolder).toBe(newFolder)
			})
		})
	})
})
