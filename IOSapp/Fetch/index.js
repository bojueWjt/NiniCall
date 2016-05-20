import baseURL from '../config';

const getCode = (phoneNum, callBack) => {
  fetch(`${baseURL}/user/getCode/${phoneNum}`).
    then((response) => response.json()).
    then((response) => {
    callBack(response);
  }).done();
};

const createUser = (params, callBack) => {
  fetch(`${baseURL}/user/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      callBack(data);
    }).done();
};

const signin = (params, callBack) => {
  fetch(`${baseURL}/user/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      callBack(data);
    }).done();
};

const findOneUser = (phoneNum, callBack) => {
  fetch(`${baseURL}/user/findUser/${phoneNum}`).
  then((response) => response.json()).
  then((response) => {
    callBack(response);
  }).done();
};

const addFriend = (phoneNum, currentUserId, friendId, callBack) => {
  let params = {
    phoneNum,
    currentUserId,
    friendId,
  };

  fetch(`${baseURL}/user/addFriend`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      callBack(data);
    }).done();
};

export const userFetch = {
  getCode,
  createUser,
  signin,
  findOneUser,
  addFriend,
};
