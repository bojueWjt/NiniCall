import React from 'react-native';
import Login from './IOSapp/containers/login';
import Guide from './IOSapp/containers/Guide';
import { userStorage } from './IOSapp/Storage';
import ThemeColor from './IOSapp/style/ColorTheme';
import App from './IOSapp/containers/App';

const {
  AppRegistry,
  Component,
  StyleSheet,
} = React;

class NiniCall extends Component {

  state = {
    isLogin: false,
  };

  componentWillMount() {
    // 保存登录状态
    userStorage.getUserId(this.keepLogin)
  }

  keepLogin = (err, id) => {
    if (id) {
      this.setState({
        isLogin: true,
        userId: id
      });
    }
  };

  handleLoginSuccess = (userInfo) => {
    this.setState({
      isLogin: true,
      userInfo: userInfo,
      userId: userInfo._id,
    });
  };

  render() {
    const { isLogin, userId, userInfo } = this.state;
    return (
        isLogin?<App
          userId={userId}
          userInfo={userInfo}
        /> : <Guide
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