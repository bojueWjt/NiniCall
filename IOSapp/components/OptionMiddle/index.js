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
  bubbleView: {
    borderRadius: 25,
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 35,
    marginRight: 10,
    borderColor: 'red'
  },
  bubbleText: {
    color: '#fff',
  }
});


const newFriendIcon = (<View style={styles.iconWrap}>
    <Icon name="person-add" size={20} color={ColorTheme.highTextColor} />
  </View>);

const containerStyle = {
  height: 50,
};

class OptionMiddle extends Component {

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const {
      text,
      optionIcon,
      handlePress,
      friendRequestNum,
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
      ),
      (
        friendRequestNum === 0 ? null :
          (<View style={styles.bubbleView}>
            <Text style={styles.bubbleText}>{friendRequestNum}</Text>
          </View>)
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



