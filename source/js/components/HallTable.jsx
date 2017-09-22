import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList, getListSuccess } from '../actions/list';
import { Hall } from '../domain/Hall';
import { Place } from '../domain/Place';

class HallTable extends Component {

  constructor(props) {
    super(props);

    this.hallCount = 3;
    this.placeCount = 4;

    this.hallList = this.createHallList(this.hallCount, this.placeCount);
  }

  // Create list for hall table
  createHallList(hallCount, placeCount) {
    let hallList = [];
    for(let i = 1; i <= hallCount; i++) {
      hallList.push(new Hall(i));
      let places = [];
      for(let p = 1; p <= placeCount; p++) {
        places.push(new Place(p));
      }
      hallList[i - 1].setPlaces(places);
    }
    return hallList;
  }

  // Get data from server
  componentDidMount() {
    this.props.getList();
  }

  // Set hall list with data from server
  updateLocalList() {
    let maxPlaceTime = null;

    this.props.listStore.list.forEach(value => {
      let place = this.hallList[value.hall_id - 1].getPlace(value.place_id - ((value.hall_id - 1) * 4));

      if(!maxPlaceTime || maxPlaceTime.getTimer() > value.timer_start_ts) maxPlaceTime = place;

      place.setTimer(value.timer_start_ts);
    });

    maxPlaceTime.setToTopTime();
  }

  render() {
    if(this.props.listStore.loading === true) {
      this.updateLocalList();
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Hall id</th> <th>Place 1</th> <th>Place 2</th> <th>Place 3</th> <th>Place 4</th>
          </tr>
        </thead>
        <tbody>
          {this.hallList.map(hall =>
            (
              <tr key={hall.id}>
                <td>{hall.id}</td>
                {hall.places.map(place =>
                  (
                    <td key={hall.id + "|" + place.id} className={place.color}>{place.time.toString()}</td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    )
  }
}

// Connection to store
export default connect(
  state => ({
    listStore: state.list
  }),
  dispatch => ({
      getList: () => {
        dispatch(getList())
          .then((response) => {
            if(!response.error) {
              dispatch(getListSuccess(response.payload.data));
            } else {
            }
          });
      },
    }
  )
)(HallTable);
