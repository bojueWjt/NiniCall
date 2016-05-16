import React from 'react-native';
import MessageInput from '../components/MessageInput';
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
    messages: [],
    currentInputText: '',
  };

  componentWillMount() {
    const { socket } = this.props;
    const _this = this;
    socket.on('message', function(data) {
      _this.handleGetMessage(data.content);
    });
  }

  handleGetMessage = (message) => {
    const { messages } = this.state;
    messages.push(message);
    this.setState({
      messages,
    });
  };

  _handleSubmitEditing = () => {
    const {
      currentInputText
    } = this.state;
    const {
      socket,
    } = this.props;

    socket.emit('message', {
      content: currentInputText,
    });

  };

  _handleChangeText = (value) => {
    this.setState({
      currentInputText: value,
    })
  };

  renderMessageBox = () => {
    const { messages } = this.state;
    return messages.map((item, index) => {
      return (
        <MessageBox
          key={index}
          message={item}

        />
      );
    })
  };

  render() {
    return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>niniCaoo</Text>
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