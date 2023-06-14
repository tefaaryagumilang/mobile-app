import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, BackHandler, TouchableWithoutFeedback} from 'react-native';
import noop from 'lodash/noop';
import styles from './ScrollableViewOverlay.component.style';
class ScrollableViewOverlay extends Component {
  static propTypes = {
    children: PropTypes.object,
    visible: PropTypes.bool,
    onDismiss: PropTypes.func
  }
  componentDidMount () {
    const {onDismiss = noop} = this.props;
    BackHandler.addEventListener('backPress', () =>  onDismiss());
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('backPress');
  }
  render () {
    const {children, visible = false, onDismiss = noop} = this.props;
    return (
      visible ?
        (<TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.absoluteContainer}>
            <ScrollView contentContainerStyle={styles.scroller}>
              <TouchableWithoutFeedback>
                {children}
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>)
        : null
    );
  }
}

export default ScrollableViewOverlay;
