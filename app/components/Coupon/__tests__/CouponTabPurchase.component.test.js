import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../CouponTabPurchase.component';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
