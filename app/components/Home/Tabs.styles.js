import {theme} from '../../styles/core.styles';
import {contentContainerStyle, bold, borderGreyStyle, fontSizeXLStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {paddingHorizontal: 20},
  containerWhite: [
    contentContainerStyle,
    {paddingTop: 0,
      backgroundColor: theme.white}
  ],
  containerContent: [{
    flex: 1,
  }],
  title: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    paddingVertical: 20,
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  accountCarouselItem: {
    height: 800,
    width: 100,
  },
  viewMore: {
    color: theme.dark,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterIcon: {
    paddingLeft: 10,
    color: theme.darkBlue,
    marginRight: 5
  },
  exportIcon: {
    color: theme.darkBlue,
  },
  linkCreditCardContainer: {
    alignItems: 'center'
  },
  transactionsContainer: {
    paddingBottom: 20
  },
  errorText: [bold, {
    color: theme.textLightGrey,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: theme.fontSizeMedium
  }],
  reload: [bold, {
    color: theme.brand,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center'
  }],
  border: [borderGreyStyle, {
    borderBottomWidth: 1
  }],
  borderMargin: [borderGreyStyle, {
    borderBottomWidth: 1,
    marginHorizontal: 15
  }],
  buttonBackground: {
    backgroundColor: theme.inputBackground
  },
  buttonView: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  typeLabel: [fontSizeXLStyle, bold,
    {
      color: theme.white,
      fontFamily: theme.roboto
    }],
  cardsContainer: {
    backgroundColor: theme.white,
    borderRadius: 5,
    overflow: 'hidden',
    width: width * 0.85,
  },
  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  detailContainerCc: {
    paddingVertical: 10
  },
  arrowIcon: {
    color: theme.brand
  },
  row: {
    paddingTop: 10,
    alignItems: 'center'
  },
  gradientYellow: [
    '#FF6502', '#FF7F18', '#FF972C'
  ],
  openTdButton: {
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center'
  },
  openTdText: {
    fontSize: theme.fontSizeNormal,
    backgroundColor: 'transparent',
    color: theme.white,
    fontFamily: 'roboto'
  },
  addIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'transparent',
  },
  iconColor: {
    color: theme.white
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  titleLarge: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize30,
    color: theme.white,
    fontWeight: theme.fontWeightBold,
    backgroundColor: theme.transparent
  },
  imageContainer: {
    height: 190,
    width: 0.85 * width,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 10,
    zIndex: 1
  },
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  lightText: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    flex: 1,
    flexWrap: 'wrap'
  },
  orangeBling: {
    color: theme.orange,
    paddingRight: 10
  },
  othersCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 5,
    marginTop: 2,
    shadowColor: theme.black,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: theme.white
  },
  rowOthers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  blackArrow: {
    color: theme.black
  },
  whiteArrow: {
    color: theme.white,
    marginRight: 20
  },
  tabInvestmentContainer: {
    marginTop: 20
  },
  transparentContainer: {
    backgroundColor: theme.transparent
  },
  tdDesription: {
    paddingHorizontal: 20
  },
  othersCardContainer: {
    height: 120,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 15,
    zIndex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: theme.white
  },
  redBling: {
    color: theme.red,
    paddingRight: 10
  },
  blackBling: {
    color: theme.black,
    paddingRight: 10
  },
  purpleBling: {
    color: '#3A29B1',
    paddingRight: 10
  },
  gradientRed: [
    '#FC2F1F', '#F84C3F', '#F5685E'
  ],
  gradientBlack: [
    '#000000', '#2C2A2A', '#686868'
  ],
  gradientPurple: [
    '#3E2CB3', '#6544C0', '#8457CB'
  ],
  pagination: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 500
  },
  activeDot: {
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'tomato',
  },
  inactiveDot: {
    top: 0,
    left: 0,
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  dot: {
    marginVertical: -20,
  },
  manageCard: {
    paddingVertical: 10,
    backgroundColor: theme.paleGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row'
  },
  showCVV: {
    paddingVertical: 5,
    backgroundColor: theme.paleGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row'
  },
  cvvStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagestyle1: {
    height: 15,
    width: 15,
  },
  imagestyle2: {
    height: 15,
    width: 15,
  },
  text1manage: {
    paddingLeft: 10
  },
  redCvvStyle: {
    paddingLeft: 10
  },
  menu: {
    marginVertical: 25,
  },
  menuTitle: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: 50,
  },
  pictureIcon2: {
    width: 20,
    height: 20,
  },
  roboto: {
    fontFamily: 'Roboto',
    color: theme.pinkBrand
  },
  couponOutline: {
    color: theme.pinkBrand
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  greyLineHeader: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginTop: 20,
  },
  transactionsContainerHistory: {
    paddingBottom: 50
  },
};
