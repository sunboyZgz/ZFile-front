<h1 align="center">
    ZFile 前端项目
</h1>

#### code format 与 lint

- 首先具体的检测与格式都交给 IDE，这样更能提高代码编写时的效率
- formater 采用 [prettier](https://prettier.io/)
- linter 采用 [eslint](https://eslint.org/)
- 同时使用[husky](https://github.com/typicode/husky)调用 git hook 对提交到`github`的代码在`pre-commit`阶段进行，lint 与 format
