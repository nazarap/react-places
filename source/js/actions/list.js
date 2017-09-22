import axios from 'axios';

export const GET_LIST = 'GET_LIST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';


export function getList() {

  const request = axios({
    method: 'get',
    url: 'https://api.myjson.com/bins/d1mg9'
  });

  return {
    type: GET_LIST,
    payload: request
  };
}

export function getListSuccess(list) {
  return {
    type: GET_LIST_SUCCESS,
    payload: list
  };
}
