import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';
import QuickPickListItem from './QuickPickListItem.component';
import QuickPickListSearchItem from './QuickPickListSearchItem.component';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import result from 'lodash/result';
import styles from './QuickPickList.style';
import {language} from '../../config/language';

class QuickPickList extends Component {
  static propTypes = {
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    listType: PropTypes.string,
    listOfItems: PropTypes.array,
  }

  renderItem = ({item}) => {
    const  {textKey = '', subtextKey = '', secondaryTextKey = '', onSelect = noop, disabled = false, listType = ''} = this.props;
    
    const subtext = result(item, subtextKey, '');
    const text = result(item, textKey, '');
    const secondaryText = result(item, secondaryTextKey, '');

    return  listType === 'search' ?
      <QuickPickListSearchItem text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)} disabled={disabled}/>
      :
      <QuickPickListItem text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)} disabled={disabled}/>;


  }

  render () {
    const {listOfItems = [],   ...extraProps} = this.props;
    return <View style={styles.container}>
      
      {(listOfItems.length > 0)
        ? (<FlatList keyboardShouldPersistTaps='handled' removeClippedSubviews={false} style={styles.listView}
          data={listOfItems}
          enableEmptySections={true}
          renderItem={this.renderItem}
          {...extraProps}
        />)
        : (<Text style={styles.emptyList}>{language.QUICK_PICK_LIST__NOTHING_TO_SHOW}</Text>)
      }
    </View>;
  }

}

export default QuickPickList;
