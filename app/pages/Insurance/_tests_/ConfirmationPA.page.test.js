import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmationPA from '../ConfirmationPA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('ConfirmationPA: ConfirmationPA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <ConfirmationPA/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
