import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './TrackAtmCard.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {result, isEmpty} from 'lodash';

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
});

const mapDispatchToProps = () => ({
});

class TrackAtmDetailCard extends React.Component {
  static propTypes = {
    cardDataInfo: PropTypes.object.isRequired,
    navParams: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  render () {
    const {cardDataInfo} = this.props;
    const imageCard = result(cardDataInfo, 'imageCard', '');
    const productType = result(cardDataInfo, 'productType', '');
    const accNo = result(cardDataInfo, 'accNo', '');
    const cardNo = result(cardDataInfo, 'cardNo', '').replace(/^(.{4})(.{4})(.{4})(.*)$/, '$1 $2 $3 $4');
    const cardHolder = result(cardDataInfo, 'accountName', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} contentContainerStyle={styles.containerContentCard}>
        <View style={styles.upperContainerCard}>
          <ImageBackground source={{uri: imageCard}} borderRadius={15} style={styles.backgroundImageCard}>
            <View style={styles.padding}>
              <View style={styles.containerTextProductTypeRow}>
                <View style={styles.containerTextProductType}>
                  <Text style={styles.textProductTypeCard} />
                </View>
                <View style={styles.containerTextProductType}>
                  <Text style={styles.textProductTypeCard}>{productType}</Text>
                </View>
              </View>
              <View style={styles.containerCardNumber}>
                <Text style={styles.textCardNumber}>{isEmpty(cardNo) ? '**** **** **** ****' : cardNo}</Text>
              </View>
              <View style={styles.containerTextCardRow}>
                <View style={styles.containerTextLeft}>
                  <Text style={styles.textCardTitle}>{language.TRACK_ATM__CARD_HOLDER}</Text>
                  <Text style={styles.textCardValue}>{cardHolder}</Text>
                </View>
                <View style={styles.containerTextRight}>
                  <Text style={styles.textCardTitle}>{language.TRACK_ATM__ACC_NUMBER}</Text>
                  <Text style={styles.textCardValue}>{accNo}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackAtmDetailCard);
