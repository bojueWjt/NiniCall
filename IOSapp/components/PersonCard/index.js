import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorTheme from '../../style/ColorTheme';
import TouchItem from '../TouchItem';
import Button from '../RButton';

var myIcon = (<Icon name="person" size={30} color={ColorTheme.barBackground} />);

const {
  Component,
  View,
  Text,
  StyleSheet,
} = React;

class PersonCard extends Component {

  render() {
    const {
      personInfo,
      btnPressHandle,
    } = this.props;
    const content = (
      [
        (<View style={{ flex: 1 }} >
          <View style={styles.iconWrap}>
            {
              myIcon
            }
          </View>
        </View>),
        (
          <View style={styles.messageInfo}>
            <Text style={styles.personName}>{ personInfo.username }</Text>
            <Button
              onPress={btnPressHandle}
              text="加为好友"
            />
          </View>
        )
      ]
    );
    return (
      <View>
        <TouchItem children={content}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.borderColor,
  },
  messageInfo: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  personName: {
    fontSize: 14,
  },
  lastMessage: {
    marginTop: 5,
  },
});

export default PersonCard;
