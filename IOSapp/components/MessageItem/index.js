import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';

var Icon = require('react-native-vector-icons/Ionicons');
var myIcon = (<Icon name="person" size={30} color={ColorTheme.barBackground} />);

const {
  Component,
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
} = React;

class MessageBox extends Component {


  render() {
    const { handlePress } = this.props;
    return (
      <View>
        <TouchableHighlight onPress={handlePress}>
          <View style={styles.messageItem}>
            <View style={{ flex: 1 }} >
              <View style={styles.iconWrap}>
                {
                  myIcon
                }
              </View>
            </View>
            <View style={styles.messageInfo}>
              <Text style={styles.personName}>ninicoco</Text>
              <Text style={styles.lastMessage}>不认识啊</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: ColorTheme.highTextColor,
    borderBottomWidth: 1,
    borderColor: ColorTheme.borderColor,
    height: 60,
  },
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
    marginTop: 10,
  },
  personName: {
    fontSize: 14,
  },
  lastMessage: {
    marginTop: 5,
  },
});

export default MessageBox;