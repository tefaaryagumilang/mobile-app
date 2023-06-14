import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import styles from './TrackAtmCard.styles';
import {result, isEmpty} from 'lodash';
import TrackAtmDetailCard from './TrackAtmDetailCard.component';
import TrackAtmDetailStatus from './TrackAtmDetailStatus.component';
import Carousel from '../Carousel/Carousel.component';
import {language} from '../../config/language';
import {theme} from '../../styles/core.styles';
import Dots from 'react-native-dots-pagination';

class TrackAtmComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    currentLanguage: PropTypes.string,
    dataArray: PropTypes.array,
    goToActivateCard: PropTypes.func,
  }

  state = {
    activeSlide: 0
  }

  get pagination () {
    const {dataArray} = this.props;
    const {activeSlide} = this.state;
    return (
      <Dots
        length={dataArray.length}
        active={activeSlide}
        activeColor={theme.black}
        width={150}
      />
    );
  }

  renderCard = (cardData) => {
    const {navParams = {}, currentLanguage} = this.props;
    const cardDataInfo = result(cardData, 'item', {});
    return (
      <TrackAtmDetailCard
        cardDataInfo={cardDataInfo}
        navParams={navParams}
        currentLanguage={currentLanguage}
      />
    );
  }

  snapItem = (index) => this.setState({activeSlide: index});

  render () {
    const {dataArray, goToActivateCard} = this.props;
    const detailStatusTrack = result(dataArray, this.state.activeSlide, {});

    return (
      <ScrollView style={styles.containerScrollView}>
        <View>
          {!isEmpty(dataArray) ?
            <View>
              <View style={styles.containerCarousel}>
                <Carousel data={dataArray} renderCard={this.renderCard} onSnapToItem={this.snapItem} flagTrackAtm={true}/>
              </View>
              <View style={styles.pagination}>
                {this.pagination}
              </View>
            </View>
            :
            <View>
              <Text style={styles.emptyText}>{language.TRACK_ATM__IS_EMPTY}</Text>
            </View> }
          <View style={{marginHorizontal: 15}}>
            {!isEmpty(detailStatusTrack) ?
              <View>
                <TrackAtmDetailStatus index={this.state.activeSlide} detailStatusTrack={detailStatusTrack} goToActivateCard={goToActivateCard}/>
              </View>
              : null }
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TrackAtmComponent;
