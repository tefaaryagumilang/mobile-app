import {fontSizeXLStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    backgroundColor: theme.cardGrey,
    flex: 1
  },
  contentContainerStyle: {flex: 1},
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  titleTxt: [bold, {
    fontSize: theme.fontSize22
  }],
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 10
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  bgWhite: {
    backgroundColor: theme.white,
  },
  iconContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  infoContainer: {
    flex: 1.7,
  },
  infoBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: theme.containerGrey,
  },
  warningIcon: {
    color: theme.darkBlue,
    marginRight: 10
  },
  iTextDetail: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeNormal,
  },
  simasTxt: [fontSizeMediumStyle, {
    color: theme.brand,
    fontWeight: '900'
  }],
  imageOffer: {
    width: 50,
    height: 18
  },
  poinImage: {
    height: 15,
    width: 40
  },
  pad2: {
    paddingVertical: 1
  },
  accTxt: [fontSizeXLStyle, {
    fontWeight: '800'
  }],
  balanceTxt: {
    color: theme.lightGrey,
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10
  },
  cardIcon: {
    color: theme.red
  },
  arrowIcon: {
    marginRight: 15,
    color: theme.black,
    height: 20,
    width: 20
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accTxt2: [bold, {
  }],
  imageOffer2: {
    width: 50,
    height: 50
  },
  greyLine: {
    backgroundColor: theme.grey,
    height: 1,
  },
  date: {
    bottom: 20,
    left: 28,
    marginTop: 5
  },
  dateText: {
    fontSize: 12
  },
  spaceTop: {
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  typeTxt: {
    fontSize: 12
  },
  renderFooter:
  {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  red: theme.brand,
  buttoTopBillActive: {
    borderColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  buttoTopBillActivePromo: {
    borderColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 23
  },
  topButtonTextActive: {
    color: theme.white,
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: theme.brand,
  },
  underLine: {
    backgroundColor: theme.white,
    height: 3,
    width: width / 2,
    marginTop: 10
  },
  
};
