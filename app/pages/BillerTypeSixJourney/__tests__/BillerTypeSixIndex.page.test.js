import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeSixIndex from '../BillerTypeSixIndex.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(BillerTypeSixIndex);

describe('BillerTypeSixIndex page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigate={spy} dispatch={spy} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
