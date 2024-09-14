#### 项目结构
- `vue-module-federation-plugin`   vue模块联邦
- `css-store-house`   css宝藏
- `qiankun`  乾坤微前端
- `vit-vue3-frame`  vite-vue3 移动端开发脚手架

#### 使用说明
1. 安装lerna
```
npm install lerna -g
```

3. 安装依赖
```
lerna bootstrap
# 如果提示访问被拒绝，需要以管理员身份运行 set-ExecutionPolicy RemoteSigned
```

4. 启动csss宝藏
```
npm run dev:css-store-house
```

6. 打包
请将上面启动命令中的`dev`修改为`build`


#### 提交规范
为了规范提交内容，保证提交日志的可读性，定义了以下提交规范

```shell
# 新增内容
 git commit -m 'feat: 提交备注'
 # 修改bug
 git commit -m 'fix: 备注'
 # 修改样式
 git commit -m 'style: 备注'
 # 完善文档，修改文档
 git commit -m 'docs: 备注'
 # 回滚代码
 git commit -m 'revert: 备注'
 # 修改框架方面的配置信息
 git commit -m 'config: 备注'
 # 其他提交内容
 git commit -m 'chore: 备注'
```
