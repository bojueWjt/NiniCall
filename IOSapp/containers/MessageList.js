import React from 'react-native';
import MessageItem from '../components/MessageItem';
import CallMain from './CallMain';

const {
  View,
  Component,
  Text,
} = React;

class MessageList extends Component {

  handlePress = () => {
    console.log('NIninico');
  };

  _navigateToSubview = () => {
  this.props.navigator.push({
    component: CallMain,
    title: '这里是用户名',
    passProps: this.props,
  });
 };


  render() {
    const { socket } = this.props;
    return (
      <View>
        <MessageItem
          socket={socket}
          handlePress={this._navigateToSubview}
        />
      </View>
    );
  }
}

export default MessageList;
