import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyComponent from '../RegisterEmoney.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(EmoneyComponent);

describe('Emoney component', () => {
  it('renders correctly', () => { // TODO: Remove X after fixing picker component for IOS, according to the refactored pickerandroid
    const myAccount = {test: 'test'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={myAccount} handleSubmit={spy} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
