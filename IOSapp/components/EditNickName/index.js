import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

class EditNickName extends Component {
  render() {
    const {
      handleChangeValue,
      oldValue,
      text,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textWrap}>
          <Text>{text}</Text>
        </View>
        <TextInput
          defaultValue={oldValue}
          style={styles.textInputStyle}
          onChangeText={handleChangeValue}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    height: 48,
  },
  textInputStyle: {
    fontSize: 16,
    flex: 6,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: ColorTheme.borderColor,
    paddingLeft: 5,
    marginRight: 5,
    height: 32,
    backgroundColor: ColorTheme.highTextColor,
    color: ColorTheme.inputTextColor,
  }
});

export default EditNickName;