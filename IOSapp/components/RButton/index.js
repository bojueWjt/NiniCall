import React from 'react-native';
import ThemeColor from '../../style/ColorTheme';

const {
  Component,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} = React;

class Button extends Component {

  render() {
    const { handlePress, text } = this.props;
    return (
      <View>
        <TouchableHighlight underlayColor="#fff" style={styles.btn} onPress={handlePress}>
          <Text style={{color:'#fff'}}>{text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 125,
    height: 40,
    backgroundColor: ThemeColor.primaryColor,
    justifyContent: 'center',
    borderColor: ThemeColor.borderColor,
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 4,
  }
});

export default Button;