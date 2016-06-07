import React from 'react-native';
import PersonCard from '../components/PersonCard';
import MoreUserInfo from '../components/MoreUserInfo';
import OptionsSmall from '../components/OptionSmall';
import BorderView from '../components/BorderView';
import _ from 'lodash';
import EditNickName from '../components/EditNickName';
import { userFetch } from '../Fetch';
import { userStorage } from '../Storage';

const {
  Component,
  View,
  Alert,
} = React;

class UserHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      personInfo: {
      },
    };
  }

  componentWillMount() {
    userStorage.getUserInfo(this.getUserInfo);
  }

  getUserInfo = (err, userInfo) => {
    this.setState({
      personInfo: userInfo,
    });
  };

  _handleChangeUsername = (value) => {
    this.setState({
      fromData: {
        username: value,
      }
    });
  };

  _handleChangeLocal = (value) => {
    this.setState({
      fromData: {
        local: value,
      }
    })
  };

  _handleChangeMotto = (value) => {
    this.setState({
      fromData: {
        motto: value,
      }
    });
  };

  _handleSubmit = () => {

    const {
      personInfo: {
        phoneNum,
      },
      fromData
    } = this.state;

    const params = {};

    _.forIn(fromData, (value, key) => {
      if (value !== undefined) {
        params[key] = value;
      }
    });

    params.phoneNum = phoneNum;

    userFetch.updateUserInfo(params, this._handleUpdateCallBack);
  };

  _handleUpdateCallBack = (data) => {
    if (data.code === 0) {
      this.props.navigator.pop();
      this.setState(_.merge({}, this.state, {
        personInfo: data.user,
      }));
      userStorage.saveUserInfo(data.user);
    } else {
      Alert(data.errorMessage);
    }
  };

  handleToEditProps = ( propName, title, handle) => {
    const {
      personInfo,
    } = this.state;

    const props = {
      oldValue: personInfo[propName],
      handleChangeValue: handle,
      text: title
    };

    this.props.navigator.push({
      title: '修改' + title,
      passProps: props,
      component: EditNickName,
      onRightButtonPress: this._handleSubmit,
      rightButtonTitle: '完成',
    })
  };

  render() {
    const {
      personInfo
    } = this.state;
    return (
      <View>
        <PersonCard  personInfo={personInfo} />
        <MoreUserInfo personInfo={personInfo}/>
        <BorderView />
        <OptionsSmall text="上传头像" />
        <OptionsSmall handlePress={
        () => this.handleToEditProps('username', '昵称', this._handleChangeUsername)
        } text="名称" />
        <OptionsSmall
          text="地区"
          handlePress={
            () => this.handleToEditProps('local', '地区', this._handleChangeLocal)
          }
        />
        <OptionsSmall
          text="个性签名"
          handlePress={
            () => this.handleToEditProps('motto', '个性签名', this._handleChangeMotto)
           }
        />
        <BorderView />
      </View>
    );
  }
}

export default UserHome;
