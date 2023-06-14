import {theme} from '../../styles/core.styles';

export default {
  placeholderText: theme.placeholderTextColor,
  bodyContainerWithTerms:
  [{
    backgroundColor: theme.superlightGrey,
    justifyContent: 'space-between',
    minHeight: '100%',
  }],
  buttonWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  container1: {
    flex: 1,
  },
  container: [
    {
      flex: 1,
      paddingTop: 0,
    }
  ],
  inlineField: {
    marginTop: 10,
  },
  newRpIcon: {
    position: 'absolute', 
    left: 20, 
    top: 25,
    width: 30,
    height: 30
  },
  pinkBackground: {
    backgroundColor: theme.pinkBrand,
    height: 90,
  },
  inputContainer: {
    backgroundColor: theme.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginTop: -70,
  },
  containerTitle: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue,
  },
  labelTextStyle: {
    color: theme.grey,
    marginTop: 10,
    marginBottom: -10,
  },
  textPickerStyle: {
    color: theme.grey,
    fontWeight: 'normal',
    marginBottom: 15,
  },
  arrowPickerStyle: {
    color: theme.darkBlue,
    marginBottom: 10,
  },
  textPickerStyleWhenSelected: {
    color: theme.darkBlue,
    fontWeight: 'normal',
  },
  arrowPickerStyleWhenSelected: {
    color: theme.darkBlue,
  },
  inputTextStyle: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
  },
  sourceAccountHeader: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  sourceAccountContainer: {
    backgroundColor: theme.white,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    paddingBottom: 20,
  },
  minimumNote: {
    fontSize: theme.fontSizeSmall,
    color: theme.greyText,
    marginBottom: 10,
  },
  footNoteContainer: {
    backgroundColor: theme.white,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  footNote: {
    fontSize: theme.fontSizeSmall,
    color: theme.darkBlue,
    flex: 1,
    marginLeft: 10
  },
  cautionIcon: {
    color: theme.darkBlue,
  },
  cashbackContainer: {
    flex: 1,
    marginLeft: 120,
    paddingVertical: 10,
    minHeight: 100,
    justifyContent: 'center',
  },
  cashbackTitle: {
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginBottom: 10,
  },
  cashbackSubtitle: {
    fontSize: theme.fontSizeSmall
  },
  rewardImage: {
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: -20,
    left: -10,
  },
  rewardBackground: {
    position: 'absolute',
    bottom: 0,
  }
};
