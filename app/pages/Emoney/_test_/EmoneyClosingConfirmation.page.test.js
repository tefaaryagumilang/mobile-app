import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyClosingConfirmation from '../EmoneyClosingConfirmation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(EmoneyClosingConfirmation);

describe('EmoneyClosingConfirmation page', () => {
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