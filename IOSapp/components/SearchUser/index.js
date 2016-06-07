import React from 'react-native';
import SearchInput from '../SearchInput';
import { userFetch } from '../../Fetch';
import PersonHome from '../../containers/PersonHome';
import PersonCard from '../PersonCard';

const {
  Component,
  View,
  StyleSheet,
} = React;

class SearchUser extends Component {

  state ={
    isNull: true,
    personInfo: {}
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

  _handleBackFriendRequest = () => {
    this.props.navigator.pop();
  };


  _handleGetUserInfo = (response) => {
    console.log(response);
    if (response.code === 0) {
      this.setState({
        isNull: false,
        personInfo: response.user,
      })
    }
  };

  _handleToPersonHome = () => {
    const {
      personInfo,
    } = this.state;
    const {
      socket,
    } = this.props;
    const props = {
      personInfo: personInfo,
      socket: socket,
    };

    this.props.navigator.push({
      component: PersonHome,
      title: personInfo.username,
      passProps: props
    })
  };

  render() {

    const {
      personInfo,
      isNull
    } = this.state;

    const _personCard = (
      <PersonCard
        personInfo={personInfo}
        handlePress={this._handleToPersonHome}
      />
    );

    return (
      <View style={styles.container}>
        <SearchInput
          onBlur={this._handleBackFriendRequest}
          autoFocus={true}
          onSubmitEditing={this._handleFindOneUser}
          handleChangeText={this._handleChangeText}
        />
        <View style={styles.content}>
          {
            isNull ? null : _personCard
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  content: {
    paddingTop: 50,
  }
});

export default SearchUser;