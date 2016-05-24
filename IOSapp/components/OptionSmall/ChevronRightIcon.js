import Icon from 'react-native-vector-icons/Ionicons';
import ColorTheme from '../../style/ColorTheme';
import React from 'react-native';

const {
  StyleSheet,
  View,
} = React;

const styles = StyleSheet.create({
  rightWrapStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginRight: 5,
  },
});

const ChevronRightIcon =
  <View style={styles.rightWrapStyle}>
    <Icon name="chevron-right" size={15} color={ColorTheme.borderColor} />
  </View>;

export default ChevronRightIcon;