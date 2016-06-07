import React from 'react-native';
import OptionSmall from '../components/OptionSmall';
import BorderView from '../components/BorderView';
import { userStorage } from '../Storage';
import Button from '../components/RButton';

const {
  Component,
  View,
  Image,
  StyleSheet,
} = React;

class Setting extends Component {

  componentWillMount() {
    userStorage.getUserInfo(this.getUserInfo);
  }

  getUserInfo = (err, userInfo) => {
    this.setState({
      personInfo: userInfo,
    });
  };

  handleClear = () => {
    const {
      socket,
      chatSocket,
    } = this.props;
    socket.emit('disconnect');
    chatSocket.emit('disconnect');
    userStorage.clear()
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.logo} source={require('image!NiCall')}/>
        </View>
        <OptionSmall text="关于我们" />
        <OptionSmall text="软件更新" />
        <BorderView />
        <View style={styles.buttonWrap}>
          <Button text="登出" handlePress={this.handleClear}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  buttonWrap: {
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 50,
  }
});

export default Setting;