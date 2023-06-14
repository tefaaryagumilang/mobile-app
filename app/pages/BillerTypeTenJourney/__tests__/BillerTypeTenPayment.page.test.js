import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeTenPayment from '../BillerTypeTenPayment.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(BillerTypeTenPayment);

describe('BillerTypeTenPayment page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation} dispatch={spy} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
