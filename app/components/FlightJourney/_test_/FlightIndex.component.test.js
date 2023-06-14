import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import FlightIndex from '../FlightIndex.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(FlightIndex);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('FlightIndex Component: PaymentSelection', () => {
  it('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts} mockDate={true}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
