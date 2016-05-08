import React from 'react-native';
import Login from './IOSapp/containers/login';
import { userStorage } from './IOSapp/Storage';
import ThemeColor from './IOSapp/style/ColorTheme';
import App from './IOSapp/containers/App';
import './UserAgent';

import io from 'socket.io-client/socket.io';


const {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
} = React;

class NiniCall extends Component {

  socket = io('localhost:3000', {jsonp: false});

  state = {
    isLogin: false,
  };

  componentDidMount() {
    userStorage.getUserId(this.keepLogin)
  }

  keepLogin = (err, id) => {
    console.log(id);
    if (id) {
      this.setState({
        isLogin: true,
      });
    }
  };

  handleLoginSuccess = () => {
    this.setState({
      isLogin: true,
    });
  };

  render() {
    const { isLogin } = this.state;
    return (
        isLogin?<App socket={this.socket}/> : <Login
          style={[{ flex: 1 }, styles.wrapStyle]}
          handleLoginSuccess={this.handleLoginSuccess}
          barTintColor="#232323"
          titleTextColor="#fff"
          tintColor="#fff"
          translucent={false}
          itemWrapperStyle={styles.wrapStyle}
        />
    );
  }
}

const styles = StyleSheet.create({
  wrapStyle: {
    backgroundColor: ThemeColor.background,
  },
});

AppRegistry.registerComponent('NiniCall', () => NiniCall);