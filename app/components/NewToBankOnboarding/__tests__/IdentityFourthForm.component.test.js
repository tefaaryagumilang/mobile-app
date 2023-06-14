import React from 'react';
import renderer from 'react-test-renderer';
import IdentityFormComponent from '../IdentityFourthForm.component';

describe('IdentityForm component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<IdentityFormComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
