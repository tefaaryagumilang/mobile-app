import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrow: {
    marginLeft: 10,
    color: theme.brand,
    transform: [{rotate: '180deg'}]
  },
};