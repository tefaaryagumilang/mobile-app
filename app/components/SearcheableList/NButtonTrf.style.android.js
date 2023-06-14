import {theme} from '../../styles/core.styles';

export default {
  iconContainer: {
    flex: 1,
    marginTop: 5,
  },
  disabledContainer: {
    flex: 1,
    marginTop: 5,
  },
  inputIconDisable: {
    color: theme.greyLine,
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  inputIcon: {
    color: theme.red,
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  iconStyle: {
    color: theme.brand,
    borderColor: theme.brand,
  },
  iconStyleDisabled: {
    color: theme.buttonDisabledBg,
    borderColor: theme.brand,
  }
};
