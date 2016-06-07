import '../../UserAgent';
import io from 'socket.io-client/socket.io';
import _ from 'lodash';
import { userFetch } from '../Fetch';
import { userStorage } from '../Storage';

function Socket(userId) {
  const _this = this;
  const socket = io.connect('http://localhost:3000' + '/system', {jsonp: false});
  socket.on('new friend request', function(data) {
    console.log(data);
    userStorage.saveFriendRequest(data, () => console.log(data));
    _this.setState({
      friendRequestNum: _this.state.friendRequestNum + 1,
    });

    if (data.isHistoryMessage) {
      userFetch.deleteSystemHistoryMessage(data._id, (data) => console.log(data));
    }
  });
  socket.emit('new user connect', {
    userId: userId,
  });

  const chatSocket = io.connect('http://localhost:3000/chat', {
    jsonp: false
  });

  chatSocket.emit('new user connect', {
    userId: userId,
  });

  chatSocket.on('chat message', function(data) {

    console.log('call from chat message');
    let {
      chatNum,
    }  = _this.state
    _this.setState({
      chatNum: chatNum + 1,
    });
  });

  this.setState({
    socket: socket,
    chatSocket: chatSocket,
  });

}

export default Socket;