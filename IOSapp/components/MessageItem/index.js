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
    const { handlePress, chatInfo } = this.props;
    const lastMessage = chatInfo.chatMessages[chatInfo.chatMessages.length -1];
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
              <Text style={styles.personName}>{chatInfo.friendName}</Text>
              <Text style={styles.lastMessage}>{lastMessage ? lastMessage.content : null}</Text>
            </View>
            {
              chatInfo.chatNum ? (<View style={styles.chatNum}>
                <Text style={styles.chatText}>{chatInfo.chatNum}</Text>
              </View>
              ) : null
            }
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
    position: 'relative',
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
  chatNum: {
    position: 'absolute',
    top: 5,
    left: 5,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
  },
  chatText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: ColorTheme.highTextColor
  }
});

export default MessageBox;