export const formatDate = (data,rules)=>{
    let fmt = rules || 'yyyy-MM-dd hh:mm:ss';
    const format = {
        'y+':data.getFullYear(),
        'M+':data.getMonth()+1,
        'd+':data.getDate(),
        'h+':data.getHours(),
        'm+':data.getMinutes(),
        's+':data.getSeconds()
    };
    for(let key in format){
        // eslint-disable-next-line no-constant-condition
        if(new RegExp(`(${key})`).test(fmt)){
            let  val = format[key] + '';
            val = val<10 ? '0'+val:val;
            fmt = fmt.replace(RegExp.$1,val);
        }
    }
    return fmt;
};

export const filterNormalMenu =(menuList,array)=>{
    menuList.forEach(menu => {
        if(menu.menuState === 1){
            array.push(menu);
            if(menu.children && menu.children.length >0){
                menu.children = filterNormalMenu(menu.children,[]);
            }
        }
    });
    return array;
};

export default {
    formatDate,
    filterNormalMenu
};