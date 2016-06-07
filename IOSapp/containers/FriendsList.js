import React from 'react-native';
import ContactItem from '../components/ContactItem';
import  OptionMiddle from '../components/OptionMiddle';
import ColorTheme from '../style/ColorTheme';
import { userStorage } from '../Storage';
import { userFetch } from '../Fetch';
import PersonHome from './PersonHome';
import FindFriend from './FindFriend';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

const {
  Component,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
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

  constructor(props) {
    super(props);
    const {
      friendRequestNum
    } = this.props;

    this.state = {
      friendRequestNum: friendRequestNum,
      friends: [],
    }
  }

  componentWillMount() {
    userStorage.getFriends(this.handleGetFriendsList);
  }

  handleGetFriendsList = (err, friends) => {

    console.log('call from get FriendInfo');
    console.log(friends);
    this.setState({
      friends: friends,
    });
  };

  handleAddFriend = () => {
    const {
      socket,
      handleClearFriendRequestNum,
    } = this.props;
    const props = {
      socket: socket,
    };
    handleClearFriendRequestNum();
    this.setState({
      friendRequestNum: 0,
    });
    this.props.navigator.push({
      title: '好友请求',
      passProps: props,
      component: FindFriend,
    })
  };

  handlePressFriendItem = (id) => {
    userFetch.findUserById(id, this.handleToFriendUserHome)
  };

  handleToFriendUserHome = (data) => {

    if (data.code === 0) {
      const {
        socket,
        handlePushChatMessage,
        addNewChat,
        chatSocket,
      } = this.props;
      const props = {
        handlePushChatMessage: handlePushChatMessage,
        personInfo: data.friend,
        socket: socket,
        chatSocket: chatSocket,
        isFriend: true,
        addNewChat: addNewChat,
      };
      this.props.navigator.push({
        title: data.friend.username,
        passProps: props,
        component: PersonHome,
      })
    } else if (data.code > 0) {
      Alert.alert(data.errorMessage);
    }

  };

  renderFriendList = () => {
    const {
      friends
    } = this.state;

    const handlePressFriendItem = this.handlePressFriendItem;

    return (
      <View style={styles.friendListStyle}>
      {
        friends.map((item, index) => {
          return <ContactItem
            personInfo={item}
            key={index}
            handlePress={function() {
              handlePressFriendItem(item._id);
            }
            }
          />
        })
      }
      </View>);
  };

  render() {
    const {
      friendRequestNum
    } = this.state;
    return (
      <ScrollView>
        <View>
          <OptionMiddle
            optionIcon={addFriendIcon}
            friendRequestNum={friendRequestNum}
            test="添加好友请求"
            handlePress={this.handleAddFriend}
          />
          <OptionMiddle
            optionIcon={teamIcon}
            friendRequestNum={friendRequestNum}
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

const styles = StyleSheet.create({
  friendListStyle: {
    marginTop: 20,
  }
});

export default FriendsList;
