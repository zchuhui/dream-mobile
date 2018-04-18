let devApi = 'api',
  buildApi = 'http://api.idream.name/index.php?r=',
  xiaoyiwo = 'http://h5.xiaoyiwo.net/index.php?r=';

if (document.domain === 'www.idream.name') {
  devApi = buildApi
}

if (document.domain === 'api.idream.name') {
  devApi = buildApi
}

if (document.domain === 'h5.xiaoyiwo.net') {
  devApi = xiaoyiwo
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
    detail: `${devApi}/feed/info`,
    digg: `${devApi}/feed/updatedigg`,

    review: `${devApi}/feed/review`,
    del: `${devApi}/feed/del`,                // 删除梦境
    delReview: `${devApi}/feed/del-review`,   // 删除梦境评论

    collect: `${devApi}/wish/handle`,         // 梦境收藏
    collectList: `${devApi}/wish/list`,       // 梦境收藏列表

    setSecret: `${devApi}/feed/set-secret`,    // 梦境设为私密


    publish: `${devApi}/feed/publish`,        // 发梦
    uploadImg: `${devApi}/feed/upload-img`,   // 上传图片

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

    setBlack: `${devApi}/users-black/set-black`,            // 添加黑名单
    delBlack: `${devApi}/users-black/del-black`,            // 删除黑名单
    getBlackList: `${devApi}/users-black/get-blacklist`,    // 黑名单列表

    setPassword: `${devApi}/users/change-pwd`,              // 修改密码
    sendEmailCode: `${devApi}/users/send-email-code`,       // 发送邮箱验证码
    setEmail: `${devApi}/users/change-email`,               // 修改登录邮箱


  },
  message: {
    getMessageList: `${devApi}/message/get-user-msg`,
    getNotice: `${devApi}/message/get-user-notice`,
    setNotice: `${devApi}/message/set-user-notice`,
  }

}
