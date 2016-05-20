import React from 'react-native';
import Login from './IOSapp/containers/login';
import Guide from './IOSapp/containers/Guide';
import { userStorage } from './IOSapp/Storage';
import ThemeColor from './IOSapp/style/ColorTheme';
import App from './IOSapp/containers/App';
import './UserAgent';

import io from 'socket.io-client/socket.io';


const {
  AppRegistry,
  Component,
  StyleSheet,
} = React;

class NiniCall extends Component {

  socket = io('localhost:3000', {jsonp: false});

  state = {
    isLogin: false,
  };

  componentDidMount() {
    // 保存登录状态
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
        isLogin?<App socket={this.socket}/> : <Guide
          style={[{ flex: 1 }, styles.wrapStyle]}
          handleLoginSuccess={this.handleLoginSuccess}
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