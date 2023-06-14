import {contentContainerStyle, cardVerticalSpacingStyle, fontSizeMediumStyle, fontSizeSmallStyle, bold, fontSizeNormalStyle, textLightGreyStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flex: 1}],
  summaryContainer: {
    flex: 1,
    paddingVertical: 15
  },
  summaryArea: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  rowItem: {flexDirection: 'row', paddingVertical: 10},
  halfWidth: {
    flex: 1
  },
  rowItemRight: {alignSelf: 'flex-start'},
  rightItemHeader: {fontWeight: theme.fontWeightMedium},
  rightItemText: {fontWeight: theme.fontWeightLight, fontSize: theme.fontSizeSmall},
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  boldCard: [bold, fontSizeNormalStyle],
  boldTotal: [bold, fontSizeMediumStyle],
  subtext: [
    {fontWeight: theme.fontWeightLight},
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  }
};
