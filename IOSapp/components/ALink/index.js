import React from 'react-native';
import ThemeColor from '../../style/ColorTheme';

const {
  Text,
  View,
  Component,
  StyleSheet,
  TouchableHighlight,
} = React;

class ALink extends Component {

  render() {
    const { text, handlePress, style } = this.props;
    return (
      <TouchableHighlight onPress={handlePress}>
        <View style={style}>
          <Text style={[styles.a_link_style]}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

ALink.defaultProps = {
  text: '这里是A连接的文字说明',
};


const styles = StyleSheet.create({
  a_link_style: {
    color: ThemeColor.LinkColor,
    fontSize: 14,
  },
  handlePress: () => {},
});

export default ALink;