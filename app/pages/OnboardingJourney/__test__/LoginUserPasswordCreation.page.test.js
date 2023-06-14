import React from 'react';
import renderer from 'react-test-renderer';
import LoginAccount from '../LoginUserPasswordCreation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'loginWithUsernamePassword'})(LoginAccount);

describe('OnboardingJourney: LoginAccount page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
