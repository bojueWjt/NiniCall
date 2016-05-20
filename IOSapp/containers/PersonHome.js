import React from 'react-native';
import PersonCard from '../components/PersonCard';
import MoreUserInfo from '../components/MoreUserInfo';
import { userStorage } from '../Storage'
import { userFetch } from '../Fetch';
import Button from '../components/RButton';

const {
  Component,
  View,
  Text,
  Alert,
  StyleSheet
} = React;

class PersonHome extends Component {

  componentDidMount() {
    userStorage.getUserId(this.saveUserId);
  }

  saveUserId = (err, id) => {
    if (err) {
      console.log(err);
    }

    this.setState({
      currentUserId: id,
    });
  };

  _handleCallBackAddFriend = (data) => {
    if (data.code === 0) {
      this.props.navigator.pop();
    } else if(data.code > 0) {
      Alert(data.errorMessage);
    }
  };

  _handleAddFriend = () => {
    console.log('ninicococo');
    const {
      personInfo: {
        _id,
        phoneNum,
      },
    } = this.props;
    const {
      currentUserId,
    } = this.state;

    userFetch.addFriend(phoneNum, currentUserId, _id, this._handleCallBackAddFriend);
  };

  render() {
    const { personInfo } = this.props;
    console.log(personInfo);
    return (
      <View>
        <PersonCard personInfo={personInfo} />
        <MoreUserInfo />
        <View style={styles.buttonGroup}>
          <Button
            text="加为好友"
            handlePress={this._handleAddFriend}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PersonHome;
