import React from 'react-native';

const { AsyncStorage } = React;

const saveUserInfo = function(user, cb) {
  AsyncStorage.multiSet([
    ['id', user._id],
    ['username', user.username],
    ['phoneNum', user.phoneNum + ''],
  ], cb)
};

const getUserInfo = function(cb) {
  AsyncStorage.multiGet(['id', 'username', 'phoneNum'], cb)
};

const getUserId = function(cb) {
  AsyncStorage.getItem('id', cb)
};

const clear = AsyncStorage.clear;

export const userStorage = {
  saveUserInfo,
  getUserInfo,
  getUserId,
  clear,
};
