import {SAVE_NOTIF_LIST_PROMO, CLEAR_NOTIF_LIST_PROMO} from '../actions/index.actions';

export default function pushNotifPromoReducer (state = [], action) {
  switch (action.type) {
  case SAVE_NOTIF_LIST_PROMO: {
    return action.payload;
  }
  case CLEAR_NOTIF_LIST_PROMO: {
    return [];
  }
  default:
    return state;
  }
}
