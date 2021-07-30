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

#### tech tools

- [windicss](https://windicss.org/)
- [vue3](https://v3.cn.vuejs.org/)
- [vite](https://vitejs.dev/)
- [vuex](https://next.vuex.vuejs.org/)
- [vue-router](https://next.router.vuejs.org/)
- [naive-ui](https://github.com/TuSimple/naive-ui)
- [sass](https://sass-lang.com/)
- [vueuse](https://github.com/vueuse/vueuse)
- [axios](https://axios-http.com/zh/docs/intro)
- [codemirror](https://github.com/codemirror/CodeMirror)

#### 前端功能实现

##### 用户 install 与 login 模块

- [x] 用户初始化
- [x] 通过输入邮箱获取验证码
- [x] 登录
- [ ] 用户信息展示
- [ ] 修改用户信息
- [x] 退出

##### 用户 main 模块

- [x] 下载文件（暂时未实现文件夹的下载）
- [x] 创建文件目录
- [x] 创建文件
- [x] 删除 文件/文件夹
- [x] 上传 文件/文件目录
- [x] 打开文件
- [x] 简单编辑文件
- [x] 打开图片
- [ ] 展示上传文件的进度（暂时未完成调用后端接口）
- [ ] 清空上传文件的进度（需要与上传文件的进度一同优化）

#### 图片预览

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-46-30.png)

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-49-15.png)

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-50-12.png)

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-51-06.png)

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-51-24.png)

![](https://blog-zgz.oss-cn-hangzhou.aliyuncs.com/zfile/Snipaste_2021-07-30_13-52-27.png)
