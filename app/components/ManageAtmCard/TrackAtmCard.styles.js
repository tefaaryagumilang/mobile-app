import {theme} from '../../styles/core.styles';

export default {
  containerScrollView: {
    backgroundColor: theme.newGreyPalete,
  },
  containerCarousel: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: theme.transparent,
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.transparent,
    marginBottom: -20,
    marginTop: -15,
  },
  activeDot: {
    backgroundColor: theme.black,
    width: 10,
    height: 10,
    borderRadius: 4,
    marginBottom: -20,
    marginTop: -15,
    borderColor: theme.grey,
    borderWidth: 0.5,
  },
  pagination: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 2,
  },
  containerContentDetailStatus: {
    flexGrow: 1,
  },
  detailStatusContainer: {
    marginTop: 5,
    backgroundColor: theme.white,
    borderRadius: 20,
  },
  containerImageStatus: {
    marginVertical: 15,
    marginLeft: 15,
  },
  containerFlexRow: {
    flexDirection: 'row',
  },
  imageIconStatusTrack: {
    resizeMode: 'contain',
    width: 60,
  },
  verticalLineGreySubmitted: {
    width: 5,
    height: 70,
    backgroundColor: theme.grey,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalLineGreyOnProcess: {
    width: 5,
    height: 110,
    backgroundColor: theme.grey,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalLineGreyShipping: {
    width: 5,
    height: 70,
    backgroundColor: theme.grey,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalLineGreyDelivered: {
    width: 5,
    height: 70,
    backgroundColor: theme.grey,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalLineGrey: {
    width: 5,
    height: 50,
    backgroundColor: theme.grey,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalLineBrand: {
    width: 5,
    height: 70,
    backgroundColor: theme.brand,
    alignSelf: 'center',
  },
  containerTextTitleStatus: {
    marginLeft: 10,
  },
  textTitleStatus: {
    fontSize: theme.fontSizeXS,
  },
  textStatusTrack: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
  },
  containerTextDateTimeStatus: {
    justifyContent: 'center',
    flex: 1,
  },
  viewTextDateTimeStatus: {
    borderRadius: 7,
    backgroundColor: theme.newGreyPalete,
    padding: 10,
    marginLeft: 10,
    marginRight: 100,
  },
  viewTextDateTimeStatusActive: {
    borderRadius: 7,
    backgroundColor: theme.newGreyPalete,
    padding: 10,
    marginVertical: 15,
    marginLeft: 10,
  },
  containerContentCard: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  upperContainerCard: {
    height: 230,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 7,
    elevation: 2,
  },
  backgroundImageCard: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  padding: {
    padding: 15
  },
  textProductTypeCard: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    textAlign: 'right',
  },
  containerTextProductTypeRow: {
    flexDirection: 'row',
  },
  containerTextProductType: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 11,
  },
  containerCardNumber: {
    justifyContent: 'center',
    marginTop: 87,
  },
  textCardNumber: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'OCRAStd',
    textAlign: 'center',
    color: theme.white,
  },
  containerTextCardRow: {
    flexDirection: 'row',
    marginTop: 7,
  },
  containerTextLeft: {
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 15,
  },
  containerTextRight: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 20,
  },
  textCardTitle: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: 'OCRAStd',
  },
  textCardValue: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontFamily: 'OCRAStd',
    marginTop: 7,
  },
  buttonActivateCard: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  styleButtonActivateCard: {
    marginVertical: 15,
  },
  titleYourCard: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold,
    marginBottom: 20,
  },
  containerDateTimeStatusLeft: {
    alignItems: 'flex-start',
  },
  containerDateTimeStatusRight: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  textDateTimeTitle: {
    fontSize: theme.fontSizeSmall,
    marginBottom: 3,
    fontFamily: theme.roboto,
  },
  textDateTimeValue: {
    fontSize: theme.fontSizeSmall,
    marginBottom: 3,
    fontFamily: theme.roboto,
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium,
    marginTop: 200,
  },
};
