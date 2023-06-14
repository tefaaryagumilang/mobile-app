import React from 'react';
import renderer from 'react-test-renderer';
import AddNewAtmCardChooseAddress from '../AddNewAtmCardChooseAddress.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(AddNewAtmCardChooseAddress);

describe('AddNewAtmCardChooseAddress page', () => {
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
