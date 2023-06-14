import {contentContainerStyle, bold} from '../../styles/common.styles';
import {theme, text as textStyles} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
const {width, height} = Dimensions.get('window');
const trueWidth = (width - 40);
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    left: 5,
    alignSelf: 'center',
    backgroundColor: theme.white,
    borderRadius: 50,
    padding: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 1.5},
    marginTop: -33,
    marginRight: -68,
    elevation: 4
  },
  container: [contentContainerStyle, {backgroundColor: theme.superLightpurple,
  }],
  roboto: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  wrapPicture: {

  },
  picture: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shadowImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  wrapSettings: {
    alignSelf: 'flex-end',
  },
  wrapNames: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 70,
    marginHorizontal: -150
  },
  names: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  subNames: {

  },
  content: {
    backgroundColor: theme.white,
    marginVertical: 10,
  },
  couponFill: {
    position: 'absolute',
    color: '#F5E5E6',
  },
  height: {
    height: 30
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1
  },
  rowCenterIcon: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textTittle: {
    flex: 1
  },
  ml5: {
    marginLeft: 5,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  menu: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu1: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  menuTitle: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  menuTxt: {
    fontWeight: theme.fontWeightLight,
  },
  wrapCoupon: {
    alignItems: 'center',
    width: trueWidth / 3,
  },
  wrapCoupon2: {
    alignItems: 'center',
    width: trueWidth / 2,
  },
  wrapCoupon2New: {
    alignSelf: 'center',
    width: trueWidth / 3,
    flexDirection: 'column',
    marginTop: -10
  },
  media: {
    backgroundColor: theme.white,
    borderRadius: 10,
    borderColor: 'transparent',
    position: 'absolute',
    width: width * 0.9,
    marginVertical: width * 0.20,
  },
  width: {
    width: 50,
  },
  activitiesFill: {
    color: '#F8E71C'
  },
  activitiesOutline: {
    position: 'absolute'
  },
  scheduledFill: {
    color: '#C1FFD7'
  },
  scheduledOutline: {
    position: 'absolute',
    color: theme.black
  },
  pushillOutline: {
    position: 'absolute',
    color: theme.white
  },
  couponOutline: {
    color: theme.brand,
  },
  couponOutline1: {
    color: theme.brand
  },
  rowNotif: {
    flexDirection: 'row',
  },
  numberCoupon: {
    backgroundColor: theme.brand,
    height: 15,
    borderRadius: 10,
    alignItems: 'center',
    top: 3,
    left: 50,
    zIndex: 1,
    position: 'absolute'
  },
  numberCouponText: {
    fontSize: theme.fontSizeXS,
    color: theme.white,
    paddingTop: 1,
    paddingHorizontal: 4,
  },
  faveFill: {
    color: '#FFE205'
  },
  pushBillFill: {
    color: theme.white
  },
  autodebetFill: {
    color: theme.green
  },
  linearGradient: {
    borderRadius: 5,
    marginHorizontal: -10,
    paddingHorizontal: 10,
  },
  luckyDipBox: {
    paddingVertical: 5
  },
  iconBoxLuckyDip: {
    alignItems: 'center',
    width: 75,
    height: 75
  },
  iconLuckyDip: {
    width: 175,
    height: 25
  },
  rowCenterLuckyDip: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  luckyDipCounterText: {
    fontWeight: theme.fontWeightBold,
  },
  header: {
    backgroundColor: theme.pinkBrand,
    height: normalIosphone === true ?  height / 6 : normalIosphone === false ? height / 6 : height / 6,
    margin: -20,
    borderColor: 'transparent',
    marginBottom: 40,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  wrapProfile: {
    position: 'absolute',
    justifyContent: 'center',
    marginHorizontal: width * 0.45,
    marginVertical: Platform.OS === 'ios' ? width * 0.19 : width * 0.19,
  },
  m20: {
    marginHorizontal: 20
  },
  menuTitle2: {
    fontSize: theme.fontSizeMedium
  },
  subTitle: [bold, {
    fontSize: theme.fontSizeLarge,
    paddingTop: 40,
    paddingBottom: 20
  }],
  greyLine2: {
    height: 10,
    backgroundColor: theme.superLightpurple,
    marginVertical: -20
  },
  media2: {
    backgroundColor: theme.white,
    borderRadius: 10,
  },
  content2: {
    backgroundColor: theme.white,
    marginHorizontal: 20
  },
  buttonLogin: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  buttonSpacing: {
    marginVertical: 10,
    color: '#FED3E0'
  },
  pictureIcon: {
    alignSelf: 'center',
    width: 70,
    height: 70,
  },
  mv20: {

    marginVertical: 10
  },
  pictureIcon2: {
    width: 35,
    height: 35,
  },
  textVersion: {
    alignItems: 'center',
    paddingBottom: 20
  },
  VersionText: {
    color: theme.grey
  },


  // login style
  bodyContainerEasyPin: [{
    flexGrow: 1,
    backgroundColor: theme.radicalRed,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, contentContainerStyle],

  topContainerEasyPin: {
    paddingTop: Platform.OS === 'ios' ? 2 : 60
  },

  rowEasyPINFormat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  easypinHeaderTitle: {
    ...textStyles.h1,
    color: theme.white,
    paddingBottom: 10
  },
  // paddingHeader: {
  //   padding: 30,
  //   marginTop: 13
  // },
  easypinIcon: {
    color: theme.white,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
  rowLoginEasyPIN: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingRight: 60
  },
  welcomeSubTextNewVerifyEP: {
    padding: 30,
    color: theme.white
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: theme.padding,
    paddingHorizontal: 30
  },
  forgotEasyPinContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  resendOtpButton: {
    color: theme.white,
    textDecorationLine: 'underline',
  },
  quickLoginContainer: {
    flexDirection: 'row',
    padding: 30
  },
  registerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quickLoginIconContainer: {
    paddingRight: 10
  },
  quickLoginIcon: {
    color: theme.white
  },
  quickLoginBorder: {
    borderLeftWidth: 1,
    paddingRight: 20,
    marginLeft: 20,
    borderColor: theme.white
  },
  buttonOtpSubmit: {
    paddingBottom: 65,
    paddingTop: 20,
  },
  buttonOtpSubmitEP: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 90,
    paddingTop: Platform.OS === 'ios' ? 0 : 0
  },
  colorBg: {
    color: theme.brand
  },
  buttonOtpSubmitPage2: {
    color: theme.white
  },
  buttonOtpSubmitPage: {
    color: theme.black
  },
  navigationContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  newSplitBillContainer: {
    flexDirection: 'row',
  },
  newSplitBill: {
    backgroundColor: theme.brand,
    height: 15,
    width: 30,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: -5,
  },
  newSplitBillText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
    marginTop: -2,
  },
  buttonOn: {
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: theme.brand,
    borderRadius: 20
  },
  buttonOff: {
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: theme.greyLine,
    borderRadius: 20
  },
  defaultTextWhite: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    textAlign: 'center',
  },
  defaultTextGrey: {
    color: theme.grey,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
    textAlign: 'center',
  },

  // Header
  profileHeader: {
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: width * 0.049,
    flexDirection: 'row'
  },

  nameHeader: {
    top: hp(3),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subNameHeader: {
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    paddingLeft: 10
  },
  subNameHeader2: {
    color: theme.white,
    paddingLeft: 10
  },

  // ShowQR
  showQrBtn: {
    top: hp(4),
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: theme.white,
    width: wp(32),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  showQrTxt: {
    padding: 5,
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    fontSize: theme.fontSizeSmall
  },
  showQrIcon: {
    color: theme.red,
    padding: 5,
  },
  editIcon: {
    color: theme.black
  },
  btnEdit: {
    left: 5,
  },
  logoutBtn: {
    alignSelf: 'center',
    width: wp(90),
    backgroundColor: theme.softPink,
  },
  logoutTxt: {
    color: theme.pinkBrand,
    fontWeight: theme.fontWeightMedium
  },
  pinFill: {
    color: theme.brand
  },
  pinOutline: {
    position: 'absolute',
    color: theme.black
  },
  passFill: {
    color: '#7FF2A8'
  },
  passOutline: {
    position: 'absolute',
    color: theme.black
  },
  iconSize: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  gearFill: {
    color: '#FCC86F'
  },
  gearOutline: {
    position: 'absolute',
    color: theme.black
  },
  langFill: {
    color: '#ADF9FF'
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    marginRight: 10
  },
  iconNotif: {
    color: theme.white
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
  rowHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
    marginRight: 10
  },
  greyLineVertical: {
    backgroundColor: theme.greyLine,
    width: 1,
  },
  textStyle: {
    paddingTop: 8
  },
  spaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',   
  },
  couponOutlineWA: {
    color: theme.green,
  },
  topNilaiQ: {
    paddingTop: 10
  },
  robotoNew: {
    color: theme.greyText,
    textAlign: 'center',
    marginTop: 10
  },
  tabContainer: {
    width: width / 5,
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -10,
    right: -15,
    backgroundColor: theme.pinkBrand,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  tabBadgeText: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium,
  },
  pictureIconFav: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    marginVertical: 20
  }
};
