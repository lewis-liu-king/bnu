# 北师大AI学院导师信息可视化系统 - 部署指南

## 系统要求
- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

## 本地部署步骤

### 1. 克隆项目
```bash
git clone <项目仓库地址>
cd bnu-ai-mentor-dashboard
```

### 2. 安装依赖
```bash
npm install
```

### 3. 构建项目
```bash
npm run build
```

### 4. 启动本地服务器

#### 方法一：使用Vite预览服务器
```bash
npm run preview
```

访问 http://localhost:4173 即可查看系统。

#### 方法二：使用Python本地服务器
```bash
cd dist
python3 -m http.server 8000
```

访问 http://localhost:8000 即可查看系统。

#### 方法三：使用Node.js Express服务器
1. 安装Express
```bash
npm install express
```

2. 创建server.js文件
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

3. 启动服务器
```bash
node server.js
```

访问 http://localhost:3000 即可查看系统。

## 数据更新

如果需要更新导师数据，请按照以下步骤操作：

1. 将新的CSV文件替换到项目根目录
2. 运行数据处理脚本
```bash
node src/data/processData.js
```
3. 重新构建项目
```bash
npm run build
```

## 常见问题

### 1. 构建失败
- 检查Node.js和npm版本是否符合要求
- 检查依赖是否安装成功

### 2. 数据加载失败
- 检查CSV文件格式是否正确
- 检查数据处理脚本是否运行成功

### 3. 页面显示异常
- 检查浏览器是否支持现代JavaScript特性
- 清除浏览器缓存后重新访问

## 技术支持

如果遇到问题，请联系项目维护者。