import React from 'react';
import renderer from 'react-test-renderer';
import SimasDoubleUntungSimulation from '../SimasDoubleUntungSimulation.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const initialDeposit = '100000000';
const validateAmount = () => {};
const DecoratedForm = reduxForm({form: 'testForm'})(SimasDoubleUntungSimulation);

describe('Simas Double Untung Simulation', () => {
  it('renders correctly, empty form', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm initialDeposit={initialDeposit} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, period selected', () => {
    const formValues = {
      period: {value: '3', label: '3 months', description: 'SDR02.03M'},
    };
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm initialDeposit={initialDeposit} formValues={formValues} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, amount inputted', () => {
    const formValues = {
      amount: '100000000',
    };
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm initialDeposit={initialDeposit} formValues={formValues} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, account selected', () => {
    const formValues = {
      sourceAccount: {
        name: 'aaaaaaa bbbbbb cccc',
        accountNumber: '123456789',
        balances: {availableBalance: '1000000000'},
        accountType: 'savingAccount',
        productType: 'Tabungan Simas Gold',
      }
    };
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm initialDeposit={initialDeposit} formValues={formValues} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly, complete form, without reward', () => {
    const formValues = {
      period: {value: '3', label: '3 months', description: 'SDR02.03M'},
      amount: '100000000',
      sourceAccount: {
        name: 'aaaaaaa bbbbbb cccc',
        accountNumber: '123456789',
        balances: {availableBalance: '1000000000'},
        accountType: 'savingAccount',
        productType: 'Tabungan Simas Gold',
      }
    };
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm initialDeposit={initialDeposit} formValues={formValues} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('renders correctly, with reward', () => {
    const cashbackPercent = '10';
    const cashbackAmount = '1000000';
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm cashbackPercent={cashbackPercent} cashbackAmount={cashbackAmount} validateAmount={validateAmount}/>
      </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});