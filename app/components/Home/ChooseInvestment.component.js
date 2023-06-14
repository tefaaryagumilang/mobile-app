import React from 'react';
import PropTypes from 'prop-types';
import {Text, FlatList, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './ChooseInvestment.styles';
import {listViewComparator, listLang} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, filter, startsWith} from 'lodash';

class Investment extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    goToNextPage: PropTypes.func,
    investmentDataView: PropTypes.func,
    inquiryASJ: PropTypes.func,
    simasSekuritas: PropTypes.func,
    investmentAccounts: PropTypes.object,
    isSearch: PropTypes.bool,
    nextRouteName: PropTypes.string,
    dtSource: PropTypes.string,
    listFundManagerReksadana: PropTypes.object,
  }
  comparator = listViewComparator;

  renderFundManager = (fundManagerList) => {
    const {goToNextPage, dtSource, items} = this.props;
    const fundManagerName = result(fundManagerList, 'fundManager', '');
    const itemName = fundManagerName;
    const filteredItemName = startsWith(itemName, 'PT ') ? itemName.substring(3) : itemName;
    const dtAction = dtSource + ' - ' + filteredItemName;
    const item = result(items, '0');
    return (
      <View style={styles.containerReksadana}>
        <Touchable dtActionName={dtAction} onPress={goToNextPage(item, fundManagerList)}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.titleReksadana}>{fundManagerName}</Text>
            </View>
            <SimasIcon name={'arrow'} size={15} style={styles.blackArrowReksadana}/>
          </View>
        </Touchable>
        <View style={styles.greyLineFundReksadana} />
      </View>
    );
  }
  
  renderList = ({item}) => {
    const {goToNextPage, dtSource, listFundManagerReksadana} = this.props;
    const itemName = listLang(item.code);
    const filteredItemName = startsWith(itemName, 'PT ') ? itemName.substring(3) : itemName;
    const dtAction = dtSource + ' - ' + filteredItemName;
    const codeName = result(item, 'code');
    let checkFundCode = false;
    if (codeName === 'SinarmasSekuritas') {
      checkFundCode = true;
    } else {
      checkFundCode = false;
    }
    return (
      <View>
        {
          checkFundCode ? 
            <View>
              <View style={styles.container}>
                <View style={styles.row}>
                  <View style={styles.textContainer}>
                    {listFundManagerReksadana.map(this.renderFundManager)}
                  </View>
                </View>
              </View>
            </View>
            :
            <View style={styles.container}>
              <Touchable dtActionName={dtAction} onPress={goToNextPage(item)}>
                <View style={styles.row}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{listLang(item.code)}</Text> 
                  </View>
                  <SimasIcon name={'arrow'} size={15} style={styles.blackArrow}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
            </View>
        }
      </View>
    );
  }

  render () {
    
    const {items, isSearch, investmentAccounts, nextRouteName} = this.props;
    const item = result(investmentAccounts, 'type', '');
    const itemInvestment = nextRouteName === 'portofolio_mutualfund' ? filter(item, {'type': 'portofolio_mutualfund'}) : filter(item, {'type': 'portofolio_bancassurance'});

    return (
      <View style={styles.tabInvestmentContainer}>
        {
          isSearch ?
            <FlatList enableEmptySections data={itemInvestment} renderItem={this.renderList}/>
            :
            <FlatList enableEmptySections data={items} renderItem={this.renderList}/>
        }
      </View>
    );
  }
}

export default Investment;