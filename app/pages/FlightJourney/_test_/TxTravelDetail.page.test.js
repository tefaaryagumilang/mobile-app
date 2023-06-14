import React from 'react';
import renderer from 'react-test-renderer';
import TxTravelDetail from '../TxTravelDetail.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(TxTravelDetail);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('TxTravelDetail page', () => {
  xit('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
