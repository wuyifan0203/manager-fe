import { createStore } from 'vuex';
import getters from './getters';
 
const modulesFiles = import.meta.glob('./modules/*.js');
 
const modules = {};
for (const path in modulesFiles) {
    const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
    const resource = await modulesFiles[path]();
    modules[moduleName] = resource.default;
}
 
export default createStore({
    getters,
    modules
});