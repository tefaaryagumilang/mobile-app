import React from 'react';
import renderer from 'react-test-renderer';
import AccountMenu from '../SourceAccount.component';

describe('AccountMenu component', () => {
  xit('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<AccountMenu accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
