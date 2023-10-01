// app/tests/StartingPoint.spec.ts

import { StartingPoint } from "../models/StartingPoint";

let home;

beforeEach(function () {
	const options = {
		type: "home",
		route: "/",
		name: "Hem",
		description: "Hemskärmen"
	};
	home = new StartingPoint(options);
});

describe('StartingPoint', function () {
	describe('constructor', function () {
		it('successfully instansiates an object', function () {
			assert.instanceOf(home, StartingPoint, "of the correct class");
		});
	});

	describe('get places', function() {
		it('returns', function() {
			const places = home.places;
			assert.typeOf(places, "array", "an array");
			assert.isEmpty(places, "that is empty");
		});
	});

	describe('addPlace()', function() {
		it('adds and returns', function() {
			const place = {dummy: "place"};
			home.addPlace(place);
			assert.strictEqual(home.places[0], place, "the same place")
		});
	});

	describe('remove place method', function() {
		const place = { dummy: "place3" };

		beforeEach(function() {
			home.addPlace({dummy: "place"});
			home.addPlace({dummy: "place1"});
			home.addPlace({dummy: "place2"});
			home.addPlace(place);
			home.addPlace({dummy: "place4"});
		});

		describe('setup', function() {
			it('sets up the tests', function () {
				assert.lengthOf(home.places, 5, "and has the right number of places")
			});
		});

		describe('removePlace()', function() {
			it('removes place by reference', function () {
				home.removePlace(place)
				assert.lengthOf(home.places, 4, "and gets removed from object")
			});
		});

		describe('removePlaceByIndex()', function() {
			it('removes place by index', function () {
				const returnedPlace = home.removePlaceByIndex(3)
				assert.lengthOf(home.places, 4, "and gets removed from object")
				assert.strictEqual(returnedPlace, place, "and is returned")
			});
		});
	});
});
