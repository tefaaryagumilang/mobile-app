import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './QuickPickListItem.style';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty} from 'lodash';

const QuickPickListItem = ({text, subtext, secondaryText, onPress, disabled, billerType, billerCategory, dynatrace, ...extraProps}) => {
  const isbillerCondition = billerCategory === 'Electricity (PLN)';
  let dtActionGlobal;
  if (dynatrace) {
    dtActionGlobal = dynatrace + ' - Choose ' + text;
  } else {
    if (isbillerCondition || billerType === '1' || billerType === '2' || billerType === '3' || billerType === '5' || billerType === '8' || billerType === '10') {
      dtActionGlobal = text;
    } else {
      if (text === 'Go-Pay Customer') {
        dtActionGlobal = 'Biller Gopay';
      } else {
        dtActionGlobal = 'Biller ' + text;
      }
    }
  }
  
  return (<Touchable dtActionName = {dtActionGlobal} onPress={onPress} disabled={disabled}>
    <View style={styles.container} {...extraProps}>
      <View style={styles.textContainer}>
        <View style={styles.leftSide}>
          <Text style={styles.text}>{text}</Text>
          { isEmpty(subtext) ?
            null
            :
            <Text style={styles.subtext}>{subtext}</Text>
          }
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.secondaryText}>{secondaryText}</Text>
        </View>
      </View>
      <SimasIcon name='arrow' style={styles.icon} size={10}/>
    </View>
  </Touchable>);
};

QuickPickListItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtext: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondaryText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  billerType: PropTypes.string,
  billerCategory: PropTypes.string,
  dynatrace: PropTypes.string
};

export default QuickPickListItem;
