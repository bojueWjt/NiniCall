import React from 'react-native';

const { AsyncStorage } = React;

const saveUserInfo = function(user, cb) {
  // AsyncStorage.multiSet([
  //   ['id', user._id],
  //   ['username', user.username],
  //   ['phoneNum', user.phoneNum + ''],
  // ], cb)
  AsyncStorage.setItem('currentUserInfo', JSON.stringify(user), cb);
};

const saveFriends = function(friends, cb) {
  console.log(friends);
  AsyncStorage.mergeItem('friends', JSON.stringify(friends), cb);
};

const getUserInfo = function(cb) {
  AsyncStorage.getItem('currentUserInfo')
    .then((response) => JSON.parse(response))
    .then((response) => {
      console.log(response);
        cb(null, response)
      }
    );
};

const getUserId = function(cb) {
  AsyncStorage.getItem('currentUserInfo')
    .then((response) => JSON.parse(response))
    .then((response) => {
      if (!response) {
        return;
      }
      cb(null, response._id);
    })
};

const getFriends = function(cb) {

  AsyncStorage.getItem('friends')
    .then((response) => JSON.parse(response))
    .then((response) =>{
      console.log(response);
      cb(null, response);
    });
};

const saveFriendRequest = function(friendRequest, cb) {
  const friendRequestInfo = {
    [friendRequest._id]: friendRequest,
  };
  AsyncStorage.mergeItem('friendRequest', JSON.stringify(friendRequestInfo), cb);
};

const getFriendRequest = function(cb) {
  AsyncStorage.getItem('friendRequest')
    .then((response) => JSON.parse(response))
    .then((response) => {
      cb(null, response);
    })
};

const saveMessageListProps = function(props) {
  AsyncStorage.setItem('messageListProps', JSON.stringify(props));
};

const getMessageListProps = function(cb) {
  AsyncStorage.getItem('messageListProps')
    .then((response) => JSON.parse(response))
    .then((response) => {
      cb(null, response);
    })
};

const saveFindFriendProps = function(props) {
  AsyncStorage.setItem('findFriendProps', JSON.stringify(props));
};

const getFindFriendProps = function(cb) {
  AsyncStorage.getItem('findFriendProps')
    .then((response) => JSON.parse(response))
    .then((response) => {
      cb(null, response);
    })
};

const saveChatList = (chatInfo, cb) => {
  AsyncStorage.mergeItem('chatList', JSON.stringify({
    [chatInfo.id]: chatInfo,
  }), cb);
};

const getChatList = (cb) => {
  AsyncStorage.getItem('chatList')
    .then((response) => JSON.parse(response))
    .then((response) => {
      cb(null, response);
    })
};

const clear = AsyncStorage.clear;

export const userStorage = {
  saveFriendRequest,
  saveMessageListProps,
  getMessageListProps,
  saveFindFriendProps,
  getFindFriendProps,
  getFriendRequest,
  saveUserInfo,
  saveFriends,
  saveChatList,
  getChatList,
  getUserInfo,
  getFriends,
  getUserId,
  clear,
};
