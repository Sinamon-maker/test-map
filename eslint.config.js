import vuetifyConfig from 'eslint-config-vuetify/index.ts.mjs';

export default {
  ...vuetifyConfig,
  rules: {
    ...vuetifyConfig.rules,
    'vue/script-indent': 'off',
  },
};
