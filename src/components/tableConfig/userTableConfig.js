
const config  = {
    tableConfig:{
        border:true
    },
    columnConfig:[
        // {
        //     type:'selection ',
        //     key:'selection'
        // },
        {
            key:'userId',
            label:'user ID',
            prop:'userId'
        },
        {
            key:'userName',
            label:'user name',
            prop:'userName'
        },
        {
            key:'userEmail',
            label:'Email',
            prop:'userId'
        },
        {
            key:'userRole',
            label:'role',
            prop:'role'
        },
        {
            key:'userState',
            label:'state',
            prop:'state'
        },
        {
            key:'createTime',
            label:'create time',
            prop:'createTime'
        },
        {
            key:'lastLoginTime',
            label:'last login time',
            prop:'lastLoginTime'
        },

    ]
};

export default config;