import React from 'react';
import renderer from 'react-test-renderer';

import DealDetail from '../DealDetail.page';

describe('DealDetail component', () => {
  xit('DealDetail: renders correctly', () => {
    const tree = renderer.create(<DealDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
