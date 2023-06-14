import provinceListStore from '../provinceListStore.reducer';
import {SAVE_PROVINCE_LIST_STORE, CLEAR_PROVINCE_LIST_STORE} from '../../actions/index.actions';

describe('Reducer: loan accounts', () => {
  it('Should return default state by default', () => {
    const initialState =  [];
    expect(provinceListStore(undefined, {})).toEqual(initialState);
  });
  it('Should update loan accounts', () => {
    const previousState = [];
    const nextState = [{'test': '1234'}];
    const action = {type: SAVE_PROVINCE_LIST_STORE, payload: [{'test': '1234'}]};
    expect(provinceListStore(previousState, action)).toEqual(nextState);
  });
  it('Should clear loan accounts', () => {
    const previousState = [{'test': '1234'}];
    const nextState = [];
    const action = {type: CLEAR_PROVINCE_LIST_STORE, payload: {}};
    expect(provinceListStore(previousState, action)).toEqual(nextState);
  });
});
