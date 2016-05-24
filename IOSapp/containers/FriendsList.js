import React from 'react-native';
import ContactItem from '../components/ContactItem';
import  OptionMiddle from '../components/OptionMiddle';
import ColorTheme from '../style/ColorTheme';
import FindFriend from './FindFriend';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

const {
  Component,
  View,
  ScrollView,
  StyleSheet,
  Text,
} = React;

const baseIconStyle = {
  width: 30,
  height: 30,
  marginTop: 10,
  marginLeft: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: ColorTheme.originColor,
};

const getIconStyle = (backgroundColor) => {
  const iconStyle = _.merge({}, baseIconStyle, {
    backgroundColor: backgroundColor,
  });

  return StyleSheet.create({
    iconWrap: iconStyle,
  });
};

const addFriendIcon =
  <View style={getIconStyle(ColorTheme.originColor).iconWrap}>
    <Icon name="person-add" size={20} color={ColorTheme.highTextColor} />
  </View>;

const teamIcon =
  <View style={getIconStyle(ColorTheme.greenColor).iconWrap}>
    <Icon name="person-stalker" size={20} color={ColorTheme.highTextColor} />
  </View>;

class FriendsList extends Component {

  handleAddFriend = () => {
    this.props.navigator.push({
      title: '查询用户',
      component: FindFriend,
    })
  };

  renderFriendList = () => {
    const {
      friends
    } = this.props;

    return (
      <View style={styles.friendListStyle}>
      {
        friends.map((item, index) => {
          return <ContactItem personInfo={item} key={index}/>
        })
      }
      </View>);
  };

  render() {
    return (
      <ScrollView>
        <View>
          <OptionMiddle
            optionIcon={addFriendIcon}
            test="添加好友请求"
            handlePress={this.handleAddFriend}
          />
          <OptionMiddle
            optionIcon={teamIcon}
            test="群组"
          />
          {
            this.renderFriendList()
          }
        </View>
      </ScrollView>
    );
  }
}

FriendsList.defaultProps = {
  friends: [
    {
      username: 'ninico',
    },
    {
      username: 'ninico',
    },
    {
      username: 'ninico',
    },
  ]
};

const styles = StyleSheet.create({
  friendListStyle: {
    marginTop: 20,
  }
});

export default FriendsList;
