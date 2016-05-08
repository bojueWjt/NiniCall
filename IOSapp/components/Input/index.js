import React from 'react-native';
import ThemeColor from '../../style/ColorTheme';
import Button from '../RButton';

const {
  Component,
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
} = React;

class Input extends Component {
  render() {
    const {
      handleChange,
      placeholder,
      labelText,
      icon,
      btnText,
      handlePress,
    } = this.props;

    const iconSource = 'image!' + icon;
    return (
      <View>
        {
          labelText ?
            <View style={styles.labelWarp}>
              <Text style={styles.label} >{labelText}</Text>
            </View>:null
        }
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder={placeholder}
              onChangeText={handleChange}
              style={styles.input}
            />
          </View>
          {
            btnText ?
              <View
                style={styles.sendCodeBtn}
              >
                <Button
                  text={btnText}
                  handlePress={handlePress}
                />
              </View>: null
          }


          <View style={styles.iconWrap}>
            <Image style={styles.icon} source={{ uri: icon }} />
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: ThemeColor.borderColor,
  },
  input: {
    height: 48,
    paddingLeft: 75,
    color: ThemeColor.inputTextColor,
    fontSize: 16,
  },
  label: {
    marginLeft: 19,
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColor.labelTextColor,
  },
  labelWarp: {
    justifyContent: 'center',
    height: 50,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: Image.resizeMode.contain,
  },
  iconWrap: {
    marginTop: -36,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: ThemeColor.borderColor,
    position: 'absolute',
    paddingRight: 20,
  },
  sendCodeBtn: {
    position: 'absolute',
    marginLeft: 190,
    marginTop: -45,
  }
});

export default Input;

