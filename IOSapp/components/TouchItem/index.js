import React from 'react-native';
import ColorTheme from '../../style/ColorTheme';
import _ from 'lodash';

const {
  Component,
  View,
  TouchableHighlight,
  StyleSheet,
} = React;

const styleConfig = {
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    backgroundColor: ColorTheme.highTextColor,
    borderColor: ColorTheme.borderColor,
    height: 60,
  },
};

class TouchItem extends Component {

  getContainerStyle = () => {
    const {
      containerStyle,
    } = this.props

    let mixContainer = {};

    if (containerStyle) {
      mixContainer = _.merge({}, styleConfig.container, containerStyle);
    } else {
      mixContainer = styleConfig.container;
    }
    return StyleSheet.create({
      container: mixContainer
    });
  };
  // add key for each child node
  renderChildren = () => {
    const { children } = this.props;
    return children.map((item, index) => {
      return Object.assign({}, item, { key: index });
    })
  };

  render() {
    const { handlePress } = this.props;
    const styles = this.getContainerStyle();
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

export default TouchItem;

