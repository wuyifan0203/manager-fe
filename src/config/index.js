const env=import.meta.env.MODE || 'prod';
const EnvConfig ={
    dev:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/fde11d5b872105efe84c70db2952710a/api'
    },
    test:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/fde11d5b872105efe84c70db2952710a/api'
    },
    prod:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/fde11d5b872105efe84c70db2952710a/api'
    }
};
export default{
    env,
    mock:true,
    ...EnvConfig[env]
};