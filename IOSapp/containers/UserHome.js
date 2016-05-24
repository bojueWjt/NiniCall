import React from 'react-native';
import PersonCard from '../components/PersonCard';
import MoreUserInfo from '../components/MoreUserInfo';
import OptionsSmall from '../components/OptionSmall';
import BorderView from '../components/BorderView';
import { userStorage } from '../Storage';

const {
  Component,
  View,
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

  getUserInfo = (err, dataArr) => {
    this.setState({
      personInfo: {
        username: dataArr[1][1],
        phoneNum: dataArr[2][1],
      },
    });
  };

  render() {
    const {
      personInfo
    } = this.state;
    return (
      <View>
        <PersonCard  personInfo={personInfo} />
        <MoreUserInfo />
        <BorderView />
        <OptionsSmall text="上传头像" />
        <OptionsSmall text="名称" />
        <OptionsSmall text="地区" />
        <OptionsSmall text="个性签名" />
        <BorderView />
      </View>
    );
  }
}

export default UserHome;
