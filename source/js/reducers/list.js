import {
  GET_LIST,
  GET_LIST_SUCCESS
} from '../actions/list';

const initialState = {
  loading: false,
};

const actionsMap = {
  [GET_LIST]: (state) => {
    return { ...state, loading: false};
  },

  [GET_LIST_SUCCESS]: (state, action) => {
    return { ...state, loading: true, list: action.payload.data};
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
