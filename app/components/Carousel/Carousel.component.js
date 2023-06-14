import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import carouselStyles from './Carousel.styles';
import {noop} from 'lodash';
import {View} from 'react-native';

class Carousels extends React.Component {

  render () {
    const {renderCard, data, carouselRef = noop, onSnapToItem, details, flagTrackAtm} = this.props;
    return (
      <View>
        <Carousel
          sliderWidth={carouselStyles.sliderWidth}
          itemWidth={flagTrackAtm ? carouselStyles.itemWidthTrackAtm : carouselStyles.itemWidth}
          firstItem={0}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={1}
          enableMomentum={false}
          containerCustomStyle={carouselStyles.containerCustomStyle}
          snapOnAndroid={true}
          slideStyle={flagTrackAtm ? carouselStyles.slideStyleTrackAtm : carouselStyles.slideStyle}
          removeClippedSubviews={false}
          ref={carouselRef}
          data={data}
          renderItem={renderCard}
          onSnapToItem={onSnapToItem}
          details={details}
        />
      </View>
    );
  }
}

Carousels.propTypes = {
  carouselRef: PropTypes.func,
  renderCard: PropTypes.func,
  data: PropTypes.array,
  onSnapToItem: PropTypes.func,
  details: PropTypes.object,
  flagTrackAtm: PropTypes.bool,
};
export default Carousels;
