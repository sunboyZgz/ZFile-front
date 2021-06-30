<h1 align="center">
    ZFile 前端项目
</h1>

#### code format 与 lint

- 首先具体的检测与格式都交给 IDE，这样更能提高代码编写时的效率
- formater 采用 [prettier](https://prettier.io/)
- linter 采用 [eslint](https://eslint.org/)
- 同时使用[husky](https://github.com/typicode/husky)调用 git hook 对提交到`github`的代码在`pre-commit`阶段进行，lint 与 format

#### vite plugins

- [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)
- [@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
- [vite-plugin-windicss](https://github.com/windicss/vite-plugin-windicss)
- [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import/tree/main#readme)
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html/blob/main/src/injectHtml.ts)：`index.html`模板变量工具

#### tech stack

- [windicss](https://windicss.org/)
- [vue3](https://v3.cn.vuejs.org/)
- [vite](https://vitejs.dev/)
- [vuex](https://next.vuex.vuejs.org/)
- [vue-router](https://next.router.vuejs.org/)
- [naive-ui](https://github.com/TuSimple/naive-ui)
- [sass](https://sass-lang.com/)
- [vueuse](https://github.com/vueuse/vueuse)
- [axios](https://axios-http.com/zh/docs/intro)
