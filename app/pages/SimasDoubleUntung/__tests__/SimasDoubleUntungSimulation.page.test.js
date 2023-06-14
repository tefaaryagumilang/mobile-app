import React from 'react';
import renderer from 'react-test-renderer';
import SimasDoubleUntungSimulationPage from '../SimasDoubleUntungSimulation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SimasDoubleUntungSimulationPage);

describe('Simas Double Untung Simulation Page', () => {
  it('renders correctly', () => {
    const navigation = {
      state: {
        params: {
          periodList: [
            {value: '3', label: '3 months', description: 'SDR02.03M'},
            {value: '6', label: '6 months', description: 'SDR02.06M'},
            {value: '12', label: '12 months', description: 'SDR02.12M'},
          ],
        }
      }
    };
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigation={navigation}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});