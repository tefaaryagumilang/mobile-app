import React from 'react';
import renderer from 'react-test-renderer';
import TapGenerateCode from '../TapGenerateCode.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'TapGenerateCode'})(TapGenerateCode);

describe('TapGenerateCodeJourney: TapGenerateCode page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
