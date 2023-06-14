import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const headerSize = width * 70 / 100;

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingVertical: 5
  },
  burger: {
    paddingLeft: 10,
    color: theme.black
  },
  iconContainer: {
    paddingRight: 10
  },
  cartRed: {
    borderRadius: 15,
    height: 10,
    width: 10,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 1
  },
  headerContainer: {
    width: headerSize,
    fontStyle: theme.fontWeightBold,
    alignItems: 'center',
  },
};