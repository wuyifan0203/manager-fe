import config from '../config';
export default{
    getStorage(){
        return JSON.parse(window.localStorage.getItem(config.nameSpace) || '{}');
    },
    setItem(key,value){
        let storage = this.getStorage();
        storage[key] = value;
        window.localStorage.setItem(config.nameSpace,JSON.stringify(storage));
    },
    getItem(key){
        return this.getStorage()[key];
    },
    clearItem(key){
        let storage = this.getStorage();
        delete storage[key];
    },
    clearAll(){
        window.localStorage.clear();
    }
};