import React from 'react';
import renderer from 'react-test-renderer';
import ChangeEasyPinConfirm from '../ChangeEasyPinConfirm.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(ChangeEasyPinConfirm);

describe('Profile Componenent: ChangeEasyPinConfirm', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
