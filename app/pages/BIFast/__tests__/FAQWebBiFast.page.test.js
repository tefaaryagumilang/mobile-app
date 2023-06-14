import React from 'react';
import renderer from 'react-test-renderer';
import FAQWebPage from '../FAQWebBiFast.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

jest.mock('../FAQWebBiFast.page');
const store = createStore(() => ({}));

describe('Help : FAQ', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <FAQWebPage/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
