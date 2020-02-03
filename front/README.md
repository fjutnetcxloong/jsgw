## 目录结构

```
front
｜———— components           #公共组件目录，可更改名称
｜———— pages                #路由目录,目录下每个.js或.jsx文件都会被解析成页面路由
｜———— public               #Next.js用于提供静态资源（图片、文件等）的唯一目录，名称不能更改
｜———— static               #存放样式文件
｜———— next.config.js       #自定义配置文件
```

## 脚本命令

```
安装
yarn
or
npm i
启动一个热加载的Web服务器（开发模式）
yarn dev
or
npm run dev
自定义启动端口
yarn dev -- -p <your port here>
or
npm run dev -- -p <your port here>
打包
yarn build
or
npm run build
启动一个热加载的Web服务器（生产模式），需要先build
yarn start
or
npm run start
```
