React Isomorphic Demo
-------

一个简单的基于react+express的页面级同构demo. 
Quick Start
------

```
npm install
npm run start
```

各文件职责
----

- webpack.config.js，将react的jsx文件编译成浏览器可执行的js文件。
- main.js，express服务器，负责将页面渲染成字符串并将初始状态打到页面上。
- page/index.jsx，React页面。

如何编译文件
-----

```
npm run pack
```

License
-----

MIT
