import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasSekuritas from '../SinarmasSekuritas.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SinarmasSekuritas);

describe('SILChoosePolisInquiry: form page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
