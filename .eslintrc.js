// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        semi: ['error', 'always'],
        'vue/no-multiple-template-root': 0,
        'vue/no-v-for-template-key': 0,
        'quote-props':[2, 'as-needed'],     // 双引号自动变单引号
        'vue/multi-word-component-names':0,
        'vue/no-v-model-argument':0
    },
};
