import {contentContainerStyle, fontSizeMediumStyle, bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle, {
  }],
  filterBox: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 15,
    borderWidth: 1,
    borderColor: theme.softGrey,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  filterTextInput: {
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize
  },
  iconStyle: {
    justifyContent: 'center'
  },
  searchIcon: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  trash: {
    backgroundColor: theme.pinkBrand,
    width: 54,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  whiteIcon: {
    color: theme.white
  },
  historyItem: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingLeft: 3
  },
  desc: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
    marginBottom: 3
  }],
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 2,
    flexWrap: 'wrap',
  },
  subNo: {
    fontFamily: 'roboto',
    color: theme.black
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    flexWrap: 'wrap',
    flex: 3,
  },
  billerName: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  redArrow: {
    marginLeft: 10,
  },
  chooseFav: {
    width: width - 70
  },
  chooseFavText: {
    alignItems: 'flex-start',
    marginVertical: 10
  },
  greyLine: {
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLine,
  },
  headingFav: [fontSizeLargeStyle, bold,
    {
      color: theme.text,
      marginBottom: 30,
    }
  ],
  searchInput: {
    width: width - 80
  },
  searchInput2: {
    marginTop: 5
  },
  rowSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  newFav: [bold, {
    alignSelf: 'flex-end',
    color: theme.brand,
    marginVertical: 15
  }],
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  plusIcon: [bold, {
    color: theme.brand
  }],
  activityContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },
  reloadText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.brand
  },
  buttonStyle: {
    marginHorizontal: 35,
    marginTop: 30
  },
  cancel: [fontSizeMediumStyle, {
    color: theme.brand
  }],
  save: [fontSizeMediumStyle, {
    color: theme.brand
  }],
  saveDisabled: [fontSizeMediumStyle, {
    color: theme.buttonDisabledBg
  }],
  chooseText: [fontSizeMediumStyle, {
  }],
  containerPopup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPayee: {
    marginBottom: -30,
    paddingTop: 8
  },
  buttonBottomSplitBill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  swipeRow: {
    marginTop: 20,
    marginBottom: 20,
  },
  containerUtama: {
    flex: 1
  },
  flexGrey: {
    backgroundColor: theme.white
  },
  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 4 : height / 4,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  containerBannerWhite: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.0015,
    marginTop: Platform.OS === 'ios' ? height * 0.01 : height * 0.02, 
  },
  topBg: {
    width: width,
    height: Platform.OS === 'android' ? 60 : 80,
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20,
    marginTop: 10
  },
  scan: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 0 : 20
  },
  backButton: {
    transform: [{rotate: '180deg'}],
    color: theme.white,
    fontWeight: 'bold'
  },
  textScan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.white,
    alignSelf: 'center',
    marginLeft: width / 10
  },
  editIcon: {
    backgroundColor: theme.orange,
    width: 54,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};
