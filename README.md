# node 企业网站开发

## 项目介绍
node全栈开发企业网站，前台页面服务端渲染


mysql下载: https://dev.mysql.com/downloads/mysql/
mysql安装: https://www.cnblogs.com/laumians-notes/p/9069498.html   (CUFZbveO5+J
可视化工具 https://blog.csdn.net/qq_35055724/article/details/84570582
node.js链接mysql: https://www.runoob.com/nodejs/nodejs-mysql.html
koa教程 https://www.cnblogs.com/weijiutao/p/10691481.html
koa2: https://github.com/chenshenhai/koa2-note

## 后台目录结构
```
   src  ---------------开发源码目录
    ｜———— assets       // 静态资源————样式，图片
        —— styles       // 三方css文件
    ｜———— config       // 项目基础配置
    ｜———— controller   // 业务代码文件夹
    ｜———— db           // 数据库连接
    ｜———— model        // 数据模型定义
    ｜———— routes       // 路由文件
    ｜———— utils        // 一些工具函数
    ｜———— views        // 视图
    ｜———— app.ejs      // 应用入口js文件
命名规范: controller xxxControler 各个文件从试图-路由-controller请统一命名
各文件目录下尽量不要子目录
```


## 目录结构
```
   src  ---------------开发源码目录
    ｜———— assets       // 静态资源————样式，图片， 第三方js库
    ｜———— components   // UI组件————项目组件，其他项目也会通用的组件，eg：加载组件，弹窗组件
    ｜———— configs      // 配置————项目参数配置 eg：请求接口api地址
    ｜———— constants    // 常量定义————项目常量定义 eg: 提示语
    ｜———— http         // http请求————统一数据请求封装
    ｜———— redux        // redux相关
    ｜———— utils        // 公共函数
    ｜———— views        // 视图
        ｜———— common   // 页面公用组件
        ｜———— routes   // 页面
    ｜———— index.ejs    // index.html 文件
    ｜———— main.ejs     // 应用入口js文件

目录命名规范: 小写字母 或者 中划线 eg: input, footer-bar
文件命名规范： 首字母大写+驼峰 eg: FooterBar
```


## 代码规范
### css 命名规范

统一格式： 中划线
  命名思想： BEM，eg: block-element-modifier

1. 变量，函数统一格式：驼峰
     eg: bannerRender

### jsx逻辑规范

1. render函数尽量避免处理逻辑，有需要直接写成方法处理；

2. 变量命名统一要ES6语法；

3. 纯组件不要继承BaseComponent

4. 函数与函数之间空一行

5. 使用ES6的class来定义有状态组件：有请求数据时extends BaseComponent；无请求数据时extends React.PureComponent

6. 将state写在构造函数外面

7. 使用箭头函数创建组件内的方法，不需要使用bind绑定回调函数     [参考](https://react.docschina.org/docs/handling-events.html)

8. 使用函数来定义无状态组件

9. 函数功能是否职责单一

10. 函数不存在副作用，是否是纯函数

11. constructor不是必须的，有需要才构建，一旦有constructor，就必须要有super。

    [参考]: https://segmentfault.com/a/1190000008165717

12. react组件生命周期的函数按顺序写在最前面，然后在业务逻辑的代码

### url规范

1. URl结尾不应包含（/）
2. 正斜杠分隔符（/）必须用来指示层级关系
3. 应使用连字符（ - ）来提高URI的可读性
4. 不得在URI中使用下划线（_）
5. URI路径中全都使用小写字母

### 特殊的注释

**TODO: + 说明**：
如果代码中有该标识，说明在标识处有功能代码待编写，待实现的功能在说明中会简略说明。

**FIXME: + 说明**：（下面中的一种情况）

1、如果代码中有该标识，说明标识处代码虽然实现了功能，但是实现的方法有待商榷，希望将来能改进，要改进的地方会在说明中简略说明。

2、如果代码中有该标识，说明标识处代码需要修正，甚至代码是错误的，不能工作，需要修复，如何修正会在说明中简略说明。  




## 依赖库介绍


​                        
​                
​               
​                
​                
​                
