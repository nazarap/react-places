export class Hall {
  constructor(id, places = []) {
    this.id = id;
    this.places = places;
  }

  setPlaces = function(places) {
    this.places = places;
  };

  setPlaceByID = function(id, place) {
    this.places[id - 1] = place;
  };

  getPlace = function (id) {
    return this.places[id - 1];
  }
}
