import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  View,
  TouchableHighlight,
  StyleSheet,
} = React;

class TouchItem extends Component {

  // add key for each child node
  renderChildren = () => {
    const { children } = this.props;
    return children.map((item, index) => {
      return Object.assign({}, item, { key: index });
    })
  };

  render() {
    const { handlePress } = this.props;
    return (
      <TouchableHighlight onPress={handlePress}>
        <View style={styles.container}>
          {
            this.renderChildren()
          }
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: ColorTheme.background,
    borderBottomWidth: 1,
    borderColor: ColorTheme.borderColor,
    height: 60,
  },
});

export default TouchItem;

