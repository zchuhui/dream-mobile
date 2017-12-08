const devApi = 'api',
    buildApi = 'http://h5.xiaoyiwo.net';

module.exports = {
    chat:{
        'list':'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/chat_list',
    },
    home: {
        'list': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/chat_list',
        'list_item': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/home_list_item',
        
    },
    dream:{
        list: `${devApi}/feed/view`,
        search:`${devApi}/feed/search`,
        publish:`${devApi}/feed/publish`,
        //detail: `${devApi}/feed/view`,
    },
    message:{
        'msg': 'https://www.easy-mock.com/mock/5a0a48fab31e3216824d454d/dream/msg',
    },
    user:{
        login: `${devApi}/login/validate`,
        register: `${devApi}/login/register`,
        resetPassword: `${devApi}/login/resetpassword`,
    },
    
}