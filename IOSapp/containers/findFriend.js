import React from 'react-native';
import SearchInput from '../components/SearchInput';
import SearchUser from '../components/SearchUser';
import { userStorage } from '../Storage';
import _ from 'lodash';
import ContactItem from '../components/ContactItem';

const {
  Component,
  View,
  Text,
  StyleSheet,
} = React;

class FindFriend extends Component {

  componentDidMount() {
    userStorage.getFriendRequest(this.getFriendRequest);
  }


  getFriendRequest = (err, friendRequest) => {
    if (err) {
      console.log(err)
    }

    console.log(friendRequest);
    this.setState({
      friendRequest: friendRequest,
    });
  };

  state = {
    isNull: true,
  };

  _handleToSearchUser = () => {
    const {
      socket
    } = this.props;
    const props ={
      socket,
    };
    this.props.navigator.push({
      component: SearchUser,
      passProps: props,
    })
  };

  _handleChangeStatus = (id, status) => {
    const {
      friendRequest,
    } = this.state;
    friendRequest[id].status = status;

    this.setState({
      friendRequest,
    });
  };

  renderFriendRequest = () => {
    const {
      friendRequest
    } = this.state;

    const requestList = [];

    _.forIn(friendRequest, (value) => {
      requestList.push(value);
    });

    const friendRequestNodes = this.renderRequestList(requestList);

    return friendRequestNodes;
  };

  renderRequestList = (requestList) => {

    if(requestList.length) {
      return requestList.map((item, index) => {
        return (
          <ContactItem
            key={index}
            changeStatus={this._handleChangeStatus}
            personInfo={item}
            status={item.status}
          />
          );
      });
    }

    return null;
  };

  render() {
    const { isNull } = this.state;
    const RequestList = this.renderFriendRequest();
    return (
      <View>
        <SearchInput
          onFocus={this._handleToSearchUser}
        />
          <View style={styles.content} >
            {
              isNull ? RequestList : <Text>暂无消息</Text>
          }
        </View>
      </View>
    );
  }
}

FindFriend.defaultProps = {
  requestList: [{
    username: 'ninico',
    status: 1,
  },
    {
      username: '张海明',
      status: 2
    },
    {
      username: '江锦泰',
      status: 3,
    }],
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 50,
  },
});

export default FindFriend;

