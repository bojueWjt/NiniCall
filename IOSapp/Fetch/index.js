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

const updateUserInfo = (params, callBack) => {
  fetch(`${baseURL}/user/update`, {
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

  console.log(params);

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

const agreeFriendRequest = (id, callBack) => {

  const params = {
    id: id,
  };

  fetch(`${baseURL}/friendRequest/agree`,{
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

const deleteChatHistoryMessage = (id, callBack) => {

  const params = {
    id: id,
  };

  fetch(`${baseURL}/chatMessage/delete`,{
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

const deleteSystemHistoryMessage = (id, callBack) => {

  const params = {
    id: id,
  };

  fetch(`${baseURL}/historyMessage/delete`,{
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

const findUserById = (id, callBack) => {
  fetch(`${baseURL}/user/findOne/${id}`).
  then((response) => response.json()).
  then((response) => {
    callBack(response);
  }).done();
};

export const userFetch = {
  getCode,
  createUser,
  signin,
  findOneUser,
  addFriend,
  findUserById,
  agreeFriendRequest,
  deleteChatHistoryMessage,
  deleteSystemHistoryMessage,
  updateUserInfo,
};
