let devApi = 'api',
  buildApi = 'http://api.idream.name/index.php?r=';

if (document.domain === 'www.idream.name') {
  devApi = buildApi
}

if (document.domain === 'api.idream.name') {
  devApi = buildApi
}


module.exports = {
  chat: {
    'list': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/chat_list',
  },
  home: {
    'list': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/chat_list',
    'list_item': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/home_list_item',
  },
  dream: {
    list: `${devApi}/feed/view`,
    search: `${devApi}/feed/search`,
    publish: `${devApi}/feed/publish`,
    detail: `${devApi}/feed/info`,
    digg: `${devApi}/feed/updatedigg`,
    review: `${devApi}/feed/review`,
    del: `${devApi}/feed/del`,
  },
  user: {
    login: `${devApi}/login/validate`,
    register: `${devApi}/login/register`,
    resetPassword: `${devApi}/login/resetpassword`,
  },
  my: {
    getUserHome: `${devApi}/users/get-user-home`,
    editUser: `${devApi}/users/edit-user`,
    opinion: `${devApi}/opinion/add`,
    loginout: `${devApi}/login/loginout`,
    setBlack: `${devApi}/users-black/set-black`,
    delBlack: `${devApi}/users-black/del-black`,
    getBlackList: `${devApi}/users-black/get-blacklist`,
  },
  message: {
    getMessageList: `${devApi}/message/get-user-msg`,
    getNotice: `${devApi}/message/get-user-notice`,
    setNotice: `${devApi}/message/set-user-notice`,
  }

}
