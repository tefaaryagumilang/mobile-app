import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import EasyPinConfirm from '../EasyPinCreationConfirm.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(EasyPinConfirm);

describe('OnboardingJourney Component: EasyPinConfirmView', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
