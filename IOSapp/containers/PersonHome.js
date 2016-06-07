import React from 'react-native';
import PersonCard from '../components/PersonCard';
import CallMain from './CallMain';
import MoreUserInfo from '../components/MoreUserInfo';
import { userStorage } from '../Storage'
import { userFetch } from '../Fetch';
import Button from '../components/RButton';

const {
  Component,
  View,
  Text,
  Alert,
  StyleSheet
} = React;

class PersonHome extends Component {

  componentDidMount() {
    userStorage.getUserInfo(this.saveUserId);
  }

  saveUserId = (err, userInfo) => {
    if (err) {
      console.log(err);
    }

    this.setState({
      currentUserId: userInfo._id,
      username: userInfo.username,
    });
  };

  saveUserInfo = (err, userInfo) => {

  };

  _handleCallBackAddFriend = (data) => {
    const {
      socket,
    } = this.props;
    const {
      username
    } = this.state;
    if (data.code === 0) {
      socket.emit('new friend request', _.merge({}, { username: username}, data.friendRequest));
      this.props.navigator.pop();
    } else if(data.code > 0) {
      Alert.alert(data.errorMessage);
    }
  };

  _handleAddFriend = () => {
    const {
      personInfo: {
        _id,
        phoneNum,
      },
    } = this.props;
    const {
      currentUserId,
    } = this.state;

    userFetch.addFriend(phoneNum, currentUserId, _id, this._handleCallBackAddFriend);
  };

  handleSendMessage = () => {
    const {
      socket,
      handlePushChatMessage,
      personInfo,
      chatSocket,
    } = this.props;

    const {
      currentUserId,
    } = this.state;

    const chatInfo = {
      friendName: personInfo.username,
      id: personInfo._id,
      chatMessages: []
    };

    const props = {
      personInfo: {
        _id: currentUserId,
      },
      socket: chatSocket,
      handlePushChatMessage: handlePushChatMessage,
      chatInfo: chatInfo,
    };

    this.props.navigator.push({
      title: personInfo.username,
      component: CallMain,
      passProps: props,
    })
  };

  render() {
    const { personInfo, isFriend } = this.props;
    return (
      <View>
        <PersonCard personInfo={personInfo} />
        <MoreUserInfo personInfo={personInfo}/>
        <View style={styles.buttonGroup}>
          {
            isFriend ?
              <Button text="发送消息" handlePress={this.handleSendMessage} />
            :<Button
              text="加为好友"
              handlePress={this._handleAddFriend}
            />
          }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PersonHome;
