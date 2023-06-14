import React from 'react';
import renderer from 'react-test-renderer';
import SILeSPAJForm from '../SILeSPAJForm3.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SILeSPAJForm);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('SILeSPAJForm page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
