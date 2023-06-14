import {theme} from '../../styles/core.styles';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  bodyContainer: {
    flex: 1,
    // paddingHorizontal: 25,
  },
  containerInside: {
    paddingHorizontal: 25,
  },
  label: {
    fontSize: theme.fontSizeSmall
  },
  input: {
    fontSize: theme.fontSizeXL,
    textAlign: 'center',
    paddingVertical: 5,
    height: 60,
  },
  errorContainer: {
    paddingVertical: theme.padding,
  },
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  centerQR: {
    alignItems: 'center',
    paddingVertical: 10
  },
  releaseTitle: {
    fontSize: theme.fontSizeL,
    textAlign: 'center',
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  button: [
    buttonLargeTextStyle
  ],
  headerBox: {
    flexDirection: 'row',
    alignItems: 'space-between',

    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    marginTop: 30
  },
  rowTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topQRText: {
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
  },
  topQRTextTimer: {
    textAlign: 'center',
    color: theme.red,
  },
  shadowTimer: {
    borderRadius: 7,
    marginVertical: 15,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: theme.greyLine,
    backgroundColor: theme.greyLine
  },
  bodyBox: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,

    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  lineDashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.dashLine,
  },
  picture: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
  },
  warningBox: {
    marginHorizontal: 25,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: theme.padding,
    paddingHorizontal: 15,
    borderColor: theme.disabledGrey,
    marginTop: 40,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyleBlack: {
    paddingRight: 10
  },
  wrapTextWarning: {
    paddingRight: 30
  },
  iconTitleTop: {
    alignItems: 'center'
  },
  renewText: {
    textAlign: 'right',
    paddingRight: 20,
    paddingVertical: 20,
    color: theme.red,
    fontWeight: 'bold'
  },
  renewView: {
    alignItems: 'flex-end',
  },
  innerTextQR: {
    paddingTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBSIM: {
    position: 'absolute',
    backgroundColor: theme.white,
  },
  viewImg: {
    margin: 10,
    backgroundColor: theme.white,
  },
  imgBSIM: {
    width: ((width - 40) * 0.6) / 2,
    height: ((width - 40) * 0.6) / 8.5,
    backgroundColor: theme.white,
    margin: 5
  },
  midleImageQR: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    alignSelf: 'center',
    width: ((width - 40) * 0.31),
    height: ((width - 40) * 0.6),
    alignItems: 'center',
  },
  formContainer: {
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  buttonLogin: {
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  topBg: {
    width: width,
    height: 120,
    backgroundColor: theme.pinkBrand
  },
  buttonTopContainer: {
    flexDirection: 'row',
    width: width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonTopStyleLeft: {
    backgroundColor: theme.white,
    flexDirection: 'column',
    height: 50,
    width: width / 2.5,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  bottonTopStyleLeftTrue: {
    flexDirection: 'column',
    height: 50,
    width: width / 2.5,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  bottonTopStyleRight: {
    flexDirection: 'column',
    height: 50,
    width: width / 2.5,
    marginRight: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: theme.white,
  },
  bottonTopStyleRightTrue: {
    backgroundColor: theme.white,
    flexDirection: 'column',
    height: 50,
    width: width / 2.5,
    marginRight: 40,
    borderWidth: 1,
    borderColor: theme.white,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  textTopScan: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black
  },
  textTopScanTrue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.white
  },
  textTop: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black
  },
  textTopTrue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.black
  },
};
