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

const containerStyle = {
  height: 80,
};

class PersonCard extends Component {

  render() {
    const {
      personInfo,
      handlePress,
    } = this.props
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
            <Text style={styles.phoneNum}>电话号码: {personInfo.phoneNum}</Text>
            <Text style={styles.ninicall}>昵称: {personInfo.username}</Text>
          </View>
        )
      ]
    );
    return (
      <View>
        <TouchItem
          children={content}
          containerStyle={containerStyle}
          handlePress={handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.borderColor,
  },
  messageInfo: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  personName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phoneNum: {
    fontSize: 10,
    lineHeight: 20,
    color: ColorTheme.secondTextColor,
  },
  ninicall: {
    fontSize: 10,
    lineHeight: 20,
    color: ColorTheme.secondTextColor,
  },
  lastMessage: {
    marginTop: 5,
  },
});

export default PersonCard;
