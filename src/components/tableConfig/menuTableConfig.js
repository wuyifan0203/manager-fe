import utils from '@/utils/common';
const config  = {
    tableConfig:{
        border:true
    },
    columnConfig:[
        {
            key:'menuName',
            label:'menu name',
            prop:'menuName'
        },
        {
            key:'icon',
            label:'icon',
            prop:'icon'
        },
        {
            key:'menuType',
            label:'menu type',
            prop:'menuType',
            formatter(row,column,value){
                return {
                    1:'menu',
                    2:'button',
                } [value];
            }
        },
        {
            key:'menuCode',
            label:'menu identifier',
            prop:'menuType',
        },
        {
            key:'path',
            label:'routing address',
            prop:'path',
        },
        {
            key:'compoent',
            label:'compoent path',
            prop:'compoent',
        },
        {
            key:'menuState',
            label:'menu state',
            prop:'menuState',
            formatter(row,column,value){
                return {
                    1:'normal',
                    2:'disable',
                } [value];
            }
        },
        {
            key:'createTime',
            label:'create time',
            prop:'createTime',
            width:'145px',
            formatter(row,column,value){
                return utils.formatDate(new Date(value));
            }
        }
    ]
};

export default config;