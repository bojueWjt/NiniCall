import React from 'react-native';
import MessageItem from '../components/MessageItem';
import { userStorage } from '../Storage';
import { userFetch } from '../Fetch';
import CallMain from './CallMain';
import _ from 'lodash';

const {
  View,
  Component,
  Text,
} = React;

class MessageList extends Component {

  state = {
    chatList: {
      '1': {
        friendName: 'NiniCall',
        chatMessages: [{type: 'from', content: '欢迎来到Ninicall的世界'}],
        chatNum: 0,
        id: 1,
      }
    },
  };

  componentWillMount() {
    userStorage.getUserInfo(this.handleGetUserInfo);
  }


  constructor(props) {
    super(props);
  }

  handleGetUserInfo = (err, userInfo) => {
    this.setState({
      userInfo: userInfo,
    }, this.setSocketConfig)
  };

  setSocketConfig = () => {
    const {
      chatSocket,
    } = this.props;

    const {
      chatList,
      userInfo
    } = this.state;

    const chatFriendIdList = [];
    _.forIn(chatList, (value, key) => {
      chatFriendIdList.push(key);
    });

    const _this = this;
    const newChatList = _.merge({}, chatList);

    chatSocket.on('chat message', function(data) {

      let friendName = '';

      _.forIn(userInfo.friends, (value, key) => {
        if (value._id === data.from) {
          friendName = value.username;
          console.log(friendName);
        }
      });

      if (chatFriendIdList.indexOf(data.from) === -1) {
        newChatList[data.from] = {
          friendName: friendName,
          chatMessages: [{type: 'from', content: data.content}],
          id: data.from,
          chatNum: 1
        };
        chatFriendIdList.push(data.from);
      } else {
        newChatList[data.from].chatMessages.push({
          type: 'from',
          content: data.content,
        });
        newChatList[data.from].chatNum++;
      }

      if (data.isHistoryMessage) {
        userFetch.deleteChatHistoryMessage(data._id, (e) => console.log(e));
      }

      _this.setState({
        chatList: newChatList,
      });

    });
  };

  handlePress = () => {
    console.log('Nininico');
  };

  handleClearChatNum = (chatInfo) => {
    const {
      handleClearChatNum
    } = this.props;

    const {
      chatList
    } = this.state;

    handleClearChatNum(chatInfo.chatNum);
    const newChatList = _.merge({}, chatList);
    newChatList[chatInfo.id].chatNum = 0;
    this.setState({
      chatList: newChatList,
    })
  };

  _navigateToSubview = (chatInfo, socket) => {
    const {
      userInfo
    } = this.state;
    this.props.navigator.push({
      component: CallMain,
      title: chatInfo.friendName,
      passProps: {
        chatInfo,
        socket,
        personInfo: userInfo,
      },
    });
 };

  renderChatList = () => {
    const chatListNode = [];
    const {
      chatSocket,
    } = this.props;

    const {
      chatList,
    } = this.state;

    const _navigateToSubview = this._navigateToSubview;

    const handleClearChatNum = this.handleClearChatNum;

    _.forIn(chatList, (value, key) => {

      chatListNode.push(
        <MessageItem
          socket={chatSocket}
          chatInfo={value}
          key={key}
          handlePress={function() {
             handleClearChatNum(value);
            _navigateToSubview(value, chatSocket)
          }}
        />
      )

    });

    return chatListNode;
  };


  render() {
    return (
      <View>
        {
          this.renderChatList()
        }
      </View>
    );
  }
}

export default MessageList;
