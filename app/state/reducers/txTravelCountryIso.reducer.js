import {SAVE_DATA_TX_TRAVEL_COUNTRY_ISO, CLEAR_DATA_TX_TRAVEL_COUNTRY_ISO} from '../actions/index.actions';

export default function userReducer (state = {}, action) {
  switch (action.type) {
  case SAVE_DATA_TX_TRAVEL_COUNTRY_ISO: {
    return action.payload;
  }
  case CLEAR_DATA_TX_TRAVEL_COUNTRY_ISO: {
    return {};
  }
  default:
    return state;
  }
}
