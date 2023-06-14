import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeEightIndex from '../BillerTypeEightIndex.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

describe('MobileTopup component', () => {

  const spy = jest.fn();
  const store = createStore(() => ({}));
  const DecoratedForm = reduxForm({form: 'testForm', onSubmit: spy})(BillerTypeEightIndex);

  it('renders correctly', () => {

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
