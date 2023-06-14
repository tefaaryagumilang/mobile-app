import React from 'react';
import renderer from 'react-test-renderer';
import PaymentStatus from '../FailActivationPage.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(PaymentStatus);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('Failactivation page', () => {
  it('renders correctly', () => {
    const displayList = {key: 'TYPE', value: 'PAYMENT'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm displayList={displayList}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
