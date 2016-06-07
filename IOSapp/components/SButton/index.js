import React from 'react-native';
import _ from 'lodash';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} = React;

const baseStyle = {
  btnStyle: {
    width: 125,
    height: 40,
    backgroundColor: ColorTheme.primaryColor,
    justifyContent: 'center',
    borderColor: ColorTheme.borderColor,
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 4,
  },
  testStyle: {
    color: '#fff',
  },
};

class SButton extends Component {

  getMixStyle = () => {
    const {
      btnStyle,
      testStyle,
    } = this.props;

    let styles = baseStyle;

    if (btnStyle) {

      styles = _.merge({}, styles, {
        btnStyle: btnStyle,
      });
    }

    if (testStyle) {

      styles = _.merge({}, styles, {
        testStyle: testStyle,
      });
    }

    return StyleSheet.create(styles);
  };

  render() {

    const {
      text,
      handlePress,
    } = this.props;
    const styles = this.getMixStyle();

    return (
      <View>
        <TouchableHighlight underlayColor="#fff" style={styles.btnStyle} onPress={handlePress}>
          <Text style={styles.testStyle}>{text}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default SButton;
