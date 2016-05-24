import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  View,
  StyleSheet,
} = React;

class BorderView extends Component {
  render() {
    return (
      <View style={styles.borderViewStyle}/>
    );
  }
}

const styles = StyleSheet.create({
  borderViewStyle: {
    height: 20,
    borderTopWidth: 1,
    borderColor: ColorTheme.borderColor,
  },
});

export default BorderView;
