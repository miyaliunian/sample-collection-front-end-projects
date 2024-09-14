⚠️基础平台内部分支管理规范，请务必按此规范进行开发
<a name="N9i3N"></a>
## GitFlow流程规范
<a name="91be7c16"></a>
###### 开发分支（glink）‌
glink分支是仓库的开发分支，这个分支包含最近发布到开发环境的代码， 这个分支需从其他分支合并，避免在这个分支直接修改‌。
<a name="l7YDS"></a>
###### 测试分支（glink-test）‌
glink-test分支是仓库的测试分支，这个分支包含最近发布到测试环境的代码， 这个分支需从glink分支合并，禁止在这个分支直接修改‌。
<a name="fCijc"></a>
###### 生产分支（glink-docker）‌
glink-docker分支是仓库的生产分支，这个分支包含最近发布到生产环境的代码， 这个分支需从glink-test分支合并，禁止在这个分支直接修改‌。
<a name="5a2b2eeb"></a>
###### 补丁分支（hotfix）‌
当我们在生产环境发现新的Bug时候，我们需要基于glink分支创建一个hotfix分支，然后在hotfix分支上修复bug，完成hotfix后，我们要把hotfix分支合并回glink分支‌
<a name="fb53e8c6"></a>
###### 功能分支（feature）
feature分支主要是用来开发一个新的功能，一旦开发完成，我们合并feature分支进入glink
<a name="r8lLx"></a>
###### 专版分支（version）
version分支主要是用来开发专版功能，开发时从glink拉取，命名规范：version-单位名-功能。
<a name="wfT1B"></a>
###### demo分支（demo）
demo分支主要是对外提供的纯净框架，无业务代码，对外提供时，通常提供此分支代码。
<a name="ecff77a8"></a>
## 使用
<a name="O4O6V"></a>
#### 新功能开发

- 目前gitLab默认仓库为glink分支，做新功能的时从glink拉取分支：

       feature-'作者'-'功能概括名'-'时间'（feature-kkl-weather-11/26）

- 自测无误后提交mr到glink，稳定后删除自己的feature分支;
<a name="bf65c"></a>
#### 测试问题修复

- 修复测试环境上的问题从release拉取分支：

       fix-'作者'-'功能概括名'-'时间'（fix-kkl-weather-11/26）

- 自测无误后提交mr到release，然后稳定后删除自己的fix分支;
<a name="hkFvr"></a>
#### 线上问题修复

- 修复线上环境上的问题从glink-docker拉取分支:

       hotfix-'作者'-'功能概括名'-'时间'（hotfix-kkl-weather-11/26）

- 自测无误后提交mr到master，然后稳定后删除自己的hotfix分支;

<a name="x4wX7"></a>
## 提交规范
<a name="Z8mgi"></a>
### （1）type
    提交 commit 的类型，包括以下几种<br />    feat: 新功能<br />    fix: 修复问题<br />    docs: 修改文档<br />    style: 修改代码格式，不影响代码逻辑<br />    refactor: 重构代码，理论上不影响现有功能<br />    perf: 提升性能<br />    test: 增加修改测试用例<br />    chore: 修改工具相关（包括但不限于文档、代码生成等）<br />    deps: 升级依赖
<a name="M9dXV"></a>
### （2）scope
    修改文件的范围（包括但不限于 doc, middleware, proxy, core, config）
<a name="nwOXH"></a>
### （3）subject
    用一句话清楚的描述这次提交做了什么
<a name="EsC83"></a>
### （4）body
    补充 subject，适当增加原因、目的等相关因素，也可不写。
<a name="FqN6C"></a>
### （5）footer
    当有非兼容修改时可在这里描述清楚<br />    关联相关 issue，如 Closes #1, Closes #2, #3<br />    如果功能点有新增或修改的，还需要关联 chair-handbook 和 chair-init 的 MR，如 chair/doc!123



