import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeTwoIndex from '../CardLessWithdrawalIndex.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

describe('BillerTypeTwoIndex component', () => {

  const spy = jest.fn();
  const store = createStore(() => ({}));
  const DecoratedForm = reduxForm({form: 'testForm', onSubmit: spy})(BillerTypeTwoIndex);

  it('renders correctly', () => {

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
