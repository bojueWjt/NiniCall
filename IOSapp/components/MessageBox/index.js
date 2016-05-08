import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';

var Icon = require('react-native-vector-icons/Ionicons');
var myIcon = (<Icon name="person" size={30} color={ColorTheme.barBackground} />);

const {
  Component,
  View,
  StyleSheet,
  Text,
} = React;

class MessageBox extends Component {
  render() {
    const { message } = this.props;
    return (
      <View>
        <View style={styles.messageItem}>
          <View style={{ flex: 1 }} >
            <View style={styles.iconWrap}>
              {
                myIcon
              }
            </View>
          </View>
          <View style={styles.messageInfo}>
            <View style={styles.messageTextWrap}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
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
    paddingTop: 10,
    marginTop: 6,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
  messageTextWrap: {
    backgroundColor: ColorTheme.primaryColor,
    padding: 5,
    borderWidth: 0.5,
    marginRight: 20,
    borderColor: ColorTheme.borderColor,
  }
});

export default MessageBox;