import React from 'react-native';
import MessageInput from '../components/MessageInput';
import { userStorage } from '../Storage';
import MessageBox from '../components/MessageBox';

const {
  Component,
  View,
  Text,
  ScrollView,
  StyleSheet,
} = React;

class CallMain extends Component {

  state = {
    currentInputText: '',
    chatList: {},
  };

  constructor(props) {
    super(props);
    const {
      socket,
      chatInfo,
    } = this.props;

    this.state = {
      chatInfo: chatInfo,
    };

    const _this = this;

    socket.on('chat message', function(data) {
      const newChatInfo = _.merge({}, chatInfo);
      if (chatInfo.id = data.from) {
        newChatInfo.chatMessages.push({
          content: data.content,
          type: 'from',
        });

        _this.setState({
          chatInfo: newChatInfo,
        });
      }
    })
  }

  _handleSubmitEditing = () => {
    const {
      currentInputText,
      chatInfo,
    } = this.state;
    const {
      socket,
      personInfo,
    } = this.props;

    socket.emit('chat message', {
      from: personInfo._id,
      to: chatInfo.id,
      content: currentInputText,
    });

    console.log('emit chat message _---------');

    const content = {
      type: 'to',
      content: currentInputText,
    };

    const newChatMessages = _.merge({}, chatInfo);
    newChatMessages.chatMessages.push(content);

    this.setState({
      chatInfo: newChatMessages,
    }, this.saveChatInfo)
  };

  _handleChangeText = (value) => {
    this.setState({
      currentInputText: value,
    })
  };

  saveChatInfo = () => {
    const {
      chatInfo,
    } = this.state;

    userStorage.saveChatList(chatInfo);
  };

  renderMessageBox = () => {
    const {
      chatInfo: {
        chatMessages
      },
    } = this.state;
    return chatMessages.map((item, index) => {
      return (
        <MessageBox
          key={index}
          message={item.content}
          isSelf={item.type === 'from'}
        />
      );
    })
  };

  render() {
    return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        {
          this.renderMessageBox()
        }
        <MessageInput
          onSubmitEditing={this._handleSubmitEditing}
          handleChangeText={this._handleChangeText}
        />
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CallMain;