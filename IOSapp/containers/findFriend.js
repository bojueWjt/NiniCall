import React from 'react-native';
import SearchInput from '../components/SearchInput';
import { userFetch } from '../Fetch';
import PersonCard from '../components/PersonCard';
import PersonHome from './PersonHome';

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

  _handleToPersonHome = () => {
    const {
      personInfo,
    } = this.state;
    const props = {
      personInfo: personInfo,
    };

    this.props.navigator.push({
      component: PersonHome,
      title: personInfo.username,
      passProps: props
    })
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
              handlePress={this._handleToPersonHome}
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

