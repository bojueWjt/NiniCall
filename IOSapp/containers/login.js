/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from 'react-native';
import ALink from '../components/ALink';
import RegisterStep1 from './RegisterStep1';
import Input from '../components/Input';
import Theme from '../style/ColorTheme'
import { userFetch } from '../Fetch'
import { userStorage } from '../Storage'
import Button from '../components/RButton';

const {
  Component,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Alert,
} = React;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responseInfo: '',
      isSubmit: false,
    };
  }

  _getPassword = (val) => {
    this.setState({
      password: val,
    });
  };

  _getUserPhoneNum = (val) => {
    this.setState({
      phoneNum: val,
    });
  };

  _callBackRequest = (data) => {

    const { navigator } = this.props;
    if (data.code === 0) {
      userStorage.saveUserInfo(data.user);
      userStorage.saveFriends(data.user.friends);
      userStorage.getUserInfo((arr) => console.log(arr));
      userStorage.getUserId((err, id) => {console.log(id)});
      this.props.handleLoginSuccess(data.user);
    } else {
      Alert.alert('错误消息', data.errorMessage);
    }
  };

  _login = () => {
    const { phoneNum, password } = this.state;
    const params = {
      phoneNum,
      password,
    };

    userFetch.signin(params, this._callBackRequest)
  };

  _handleRegisterPress = () => {
    const { navigator } = this.props;
    const { isSubmit } = this.state;
    console.log(isSubmit);

    console.log("call from press");
    navigator.push({
      title: '注册',
      passProps: { isSubmit },
      component: RegisterStep1,
    })
  };

  render() {
    const {
      handleToRegister,
    } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo} source={require('image!NiCall')}/>
          </View>
          <Input
            icon="phone"
            placeholder="请输入注册的手机号码"
            handleChange={this._getUserPhoneNum}
          />
          <Input
            icon="password"
            placeholder="请输入密码"
            handleChange={this._getPassword}
          />

          <View style={{ alignItems: 'center', marginTop: 30, }}>
            <Button
              handlePress={this._login}
              text="登录"
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.ALinkGroup}>
              <ALink text="注册" style={{ marginRight: 20 }} handlePress={handleToRegister} />
              <ALink text="忘记密码" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  ALinkGroup: {
    flexDirection: 'row',
    marginTop: 28,
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: Image.resizeMode.contain,
    marginBottom: 50,
  }
});

export default Login;
