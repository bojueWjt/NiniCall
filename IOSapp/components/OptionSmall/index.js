import React from 'react-native';
import TouchItem from '../TouchItem';
import ChevronRightIcon from './ChevronRightIcon';

const {
  Component,
  StyleSheet,
  Text,
  View,
} = React;

const containerStyle = {
  height: 30,
};

class OptionSmall extends Component {


  render() {
    const {
      text,
      handlePress,
    } = this.props;
    const content = [
      <View style={styles.messageInfo}>
        <View style={styles.textWrapStyle}>
          <Text> {text} </Text>
        </View>
        {
          ChevronRightIcon
        }
      </View>
    ];
    return (
      <TouchItem
        containerStyle={containerStyle}
        children={content}
        handlePress={handlePress}
      />
    );
  }
}

const styles = StyleSheet.create({
  messageInfo: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
    justifyContent: 'flex-start',
  },
  textWrapStyle: {
    flex: 6,
  }
});

export default OptionSmall;
