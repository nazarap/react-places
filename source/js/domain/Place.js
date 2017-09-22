export class Place {
  constructor(id, place_name = null) {
    this.id = id;
    this.place_name = place_name;
    this.time = {
      timer_start_ts: null,
        toString: function() {
        if(this.timer_start_ts && new Date(this.timer_start_ts) !== "Invalid Date") {
          let minutes = (new Date() - new Date(this.timer_start_ts)) / 60000;
          let hours=Math.floor(minutes/60);
          minutes = Math.floor(minutes-hours*60);
          return `${hours}h ${minutes}m`;
        }
        return "";
      }
    };
    this.color = null;
  }

  setTimer = function(timer) {
    this.setColor("yellow");
    this.time.timer_start_ts = timer;
  };

  getTimer = function() {
    return this.time.timer_start_ts;
  };

  setPlaceName = function(place_name) {
    this.place_name = place_name;
  };

  setColor = function(color) {
    this.color = color;
  };

  setToTopTime = function() {
    this.setColor("red");
  }
}
