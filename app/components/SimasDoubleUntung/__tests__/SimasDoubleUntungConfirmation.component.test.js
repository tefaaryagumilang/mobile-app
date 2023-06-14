import React from 'react';
import renderer from 'react-test-renderer';
import SimasDoubleUntungConfirmation from '../SimasDoubleUntungConfirmation.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SimasDoubleUntungConfirmation);

describe('Simas Double Untung Confirmation', () => {
  it('renders correctly, without cashback', () => {
    const cashbackAmount = '';
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm cashbackAmount={cashbackAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, with cashback', () => {
    const cashbackAmount = '1000000';
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm cashbackAmount={cashbackAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});