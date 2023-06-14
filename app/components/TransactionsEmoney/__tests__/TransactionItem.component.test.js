import React from 'react';
import renderer from 'react-test-renderer';
import TransactionItem from '../TransactionItemEmoney.component';

describe('TransactionItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TransactionItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
