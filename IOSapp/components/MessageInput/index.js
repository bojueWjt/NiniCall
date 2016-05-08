import React from 'react-native';
import ThemeColor from '../../style/ColorTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const {
  Component,
  View,
  StyleSheet,
  Text,
  TextInput,
} = React;

class MessageInput extends Component {

  render() {
    const {
      onSubmitEditing,
      handleChangeText,
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          blurOnSubmit={false}
          onChangeText={handleChangeText}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
        />
        <View style={styles.iconWrap}>
          <Icon name="happy" size={24} color={ThemeColor.labelTextColor} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    height: 40,
    borderColor: ThemeColor.borderColor,
    backgroundColor: ThemeColor.background,
    flexDirection: 'row',
    width: 320,
    top: 464,
    position: 'absolute',
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  input: {
    marginLeft: 8,
    marginTop: 4,
    height: 32,
    flex: 5,
    color: ThemeColor.inputTextColor,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default MessageInput;