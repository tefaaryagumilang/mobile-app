const rn = require('react-native');
const React = require('react');
const PropTypes = require('prop-types');

jest.mock('Linking', () => {
  const promisify = (obj, err) => (new Promise((resolve, reject) => {
    if (err) {
      return reject(err);
    }
    return resolve(obj);
  }));

  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: () => promisify(jest.fn())
  };
});

jest.mock('TouchableNativeFeedback', () => {
  const MockComponent = () => null;
  MockComponent.Ripple = jest.fn();
  MockComponent.SelectableBackground = jest.fn();
  MockComponent.canUseNativeForeground = jest.fn();
  return MockComponent;
});

// jest.mock('NetInfo', () => ({
//   isConnected: {
//     fetch: jest.fn(() => Promise.resolve(true)),
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn()
//   }
// }));

jest.mock('AppState', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

rn.ScrollView.propTypes = {...rn.ScrollView.propTypes, style: PropTypes.oneOfType([PropTypes.array, PropTypes.object])};

jest.mock('Alert', () => ({
  alert: jest.fn()
}));

jest.mock('ScrollView', () => {
  const MockScrollView = require.requireMock('ScrollViewMock');
  const React = require('React');
  const RealScrollView = require.requireActual('ScrollView');
  class ScrollView extends React.Component {
    scrollTo () {
    }

    render () {
      return (
        <MockScrollView {...this.props} />
      );
    }
  }
  ScrollView.propTypes = RealScrollView.propTypes;
  return ScrollView;
});

rn.Animated.timing = jest.fn(() => ({start: jest.fn()}));

module.exports = rn;
