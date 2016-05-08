import React from 'react-native';
import Input from '../components/Input';
import { userFetch } from '../Fetch';
import Button from '../components/RButton';

const {
  Component,
  View,
  ScrollView,
  StyleSheet,
  Text,
} = React;

class Register extends Component {

  formData = {};

  state = {
    count: 60,
  };

  callBackGetCode = (data) => {
    if (data.code === 0) {
      this.setState({
        hasCode: true,
      });

      let i = 59;
      const timer = setInterval(function(){
        this.setState({
          count: i,
        });
        i--;
        if (i == 0) {
          clearInterval(timer);
          this.setState({
            hasCode: false,
            count: 60,
          });
        }
      }.bind(this),1000)
    }
  };

  callBackCreateUser = (data) => {
    const { navigator } = this.props;
    if (data.code === 0) {
      navigator.pop();
    }
  };

  _handleChange = (val) => {
    console.log(val);
    this.formData.phoneNum = val;
    console.log(this.formData);
  };

  _handleCodeChange = (val) => {
    this.formData.code = val;
  };

  _handleNiCallChange = (val) => {
    this.formData.username = val;
    console.log(val);
  };

  handlePasswordChange = (val) => {
    this.formData.password = val;
  };

  _handlePressSendCode = () => {
    const phoneNum = this.formData.phoneNum;
    if (!phoneNum && phoneNum != 11) {
      return;
    }
    userFetch.getCode(phoneNum, this.callBackGetCode);
  };

  _handlePressCreateUser = () => {
    if (!this.formData.username ||
        !this.formData.password ||
        !this.formData.code ||
        !this.formData.phoneNum
    ) {
      return;
    }
    userFetch.createUser(this.formData, this.callBackCreateUser);
  };

  render() {
    const { count, hasCode } = this.state;
    const { isSubmit } = this.props;
    console.log(isSubmit);
    return (
      <ScrollView>
        <View style={{ position: 'relative'}}>

          <Input
            placeholder="请输入电话号码"
            handleChange={this._handleChange}
            labelText="输入电话号码获取验证码"
            icon="phone"
            btnText={ hasCode ? `${count}秒有效`: '获取验证码'}
            handlePress={this._handlePressSendCode}
          />
        </View>

        <Input
          placeholder="请输入验证码"
          handleChange={this._handleCodeChange}
          icon="code"
        />
        <Input
          placeholder="请输入昵称"
          handleChange={this._handleNiCallChange}
          icon="code"
        />
        <Input
          placeholder="请输入密码"
          handleChange={this.handlePasswordChange}
          icon="code"
        />

        <Button
          text="注册"
          handlePress={this._handlePressCreateUser}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

export default Register;