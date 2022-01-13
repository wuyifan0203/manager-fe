
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
            prop:'role',
            formatter(row,column,value){
                return{
                    0:'admin',
                    1:'user'
                }[value];
            }
        },
        {
            key:'userState',
            label:'state',
            prop:'state',
            formatter(row,column,value){
                return{
                    1:'working',
                    2:'probation',
                    3:'intern',
                    4:'departing'
                }[value];
            }
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