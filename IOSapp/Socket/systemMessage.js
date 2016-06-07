import io from 'socket.io-client/socket.io';
import { userStorage } from '../Storage';

const systemMessageSocket = (userId) => {
  const _this = this;
  const socket = io.connect('http://localhost:3000' + '/system', {jsonp: false});
  socket.on('new friend request', function(data) {
    console.log(data);
    userStorage.saveFriendRequest(data, () => console.log(data));
    _this.setState({
      friendRequestNum: _this.state.friendRequestNum + 1,
    });
  });
  socket.emit('new user connect', {
    userId: userId,
  });
  this.setState({
    socket: socket,
  });

};

export default systemMessageSocket;