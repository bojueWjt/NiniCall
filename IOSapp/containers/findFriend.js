import React from 'react-native';
import SearchInput from '../components/SearchInput';
import { userFetch } from '../Fetch';
import PersonCard from '../components/PersonCard';
import { userStorage } from '../../IOSapp/Storage';

const {
  Component,
  View,
  Text,
  StyleSheet,
} = React;

class FindFriend extends Component {

  state = {
    isInit: true,
  };

  _handleFindOneUser = () => {
    const { userPhoneNum } = this.state;
    userFetch.findOneUser(userPhoneNum, this._handleGetUserInfo);
  };

  _handleChangeText = (value) => {
    this.setState({
      userPhoneNum: value,
    });
  };

  _handleGetUserInfo = (response) => {
    console.log(response);
    if (response.code === 0) {
      this.setState({
        personInfo: response.user,
      })
    }
  };

  _handleAddFriend = () => {
    userStorage.getUserId();
  };

  render() {
    const { personInfo, isInit } = this.state;
    return (
      <View>
        <SearchInput
          onSubmitEditing={this._handleFindOneUser}
          handleChangeText={this._handleChangeText}
        />
        <View style={styles.content} >
          {
            personInfo ? <PersonCard
              personInfo={personInfo}
              btnPressHandle={this._handleAddFriend}
            /> : <Text>没有这个人</Text>
          }
          {
            isInit ? <Text>这里咩有东西</Text> : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 50,
  },
});

export default FindFriend;

