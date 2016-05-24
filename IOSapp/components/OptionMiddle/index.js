import React from 'react-native';
import TouchItem from '../TouchItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorTheme from '../../style/ColorTheme';

const {
  Component,
  View,
  StyleSheet,
  Text,
} = React;

const styles = StyleSheet.create({
  iconWrap: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.originColor,
  },
  messageInfo: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 17,
  },
});


const newFriendIcon = (<View style={styles.iconWrap}>
    <Icon name="person-add" size={20} color={ColorTheme.highTextColor} />
  </View>);

const containerStyle = {
  height: 50,
};

class OptionMiddle extends Component {

  render() {
    const {
      text,
      optionIcon,
      handlePress,
    } = this.props;
    const content = [
      (<View style={{ flex: 1 }} >
        {
          optionIcon
        }
      </View>),
      (
        <View style={styles.messageInfo}>
          <Text>{text}</Text>
        </View>
      )
    ];

    return (
      <TouchItem
        handlePress={handlePress}
        children={content}
        containerStyle={containerStyle}
      />
    )
  }
}


OptionMiddle.defaultProps = {
  text: '新增好友请求',
  optionIcon: newFriendIcon,
};

export default OptionMiddle;



