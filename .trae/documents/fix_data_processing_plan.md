# 修复数据处理问题的计划

## 问题诊断
我发现了数据显示全是0的原因：**CSV文件的表头与processData.js代码中读取的字段名不匹配**！

### 1. bnu_ai_faculty_overview.csv 的问题
- CSV实际表头：`论文数,引用数,h-index,i10-index`
- 代码读取字段：`OA论文数,OA引用数,OA_H指数,OA_i10指数`
- 还缺少`校区`字段在代码中被读取

### 2. bnu_ai_all_papers.csv 的问题
- CSV实际表头：`教师,论文标题,年份,期刊/会议,引用数,发表场所,类型`
- 代码读取字段：`导师,论文标题,年份,发表渠道,引用数,渠道类型,研究领域`

## 修复方案

### 1. 修改 processData.js
- 更新字段名以匹配实际CSV文件的表头
- 确保论文数据正确关联到导师
- 添加校区字段读取

### 2. 重新运行数据处理
- 运行processData.js脚本重新生成正确的JSON数据

### 3. 验证修复
- 检查生成的JSON数据是否正确
- 启动应用程序验证数据显示

## 涉及文件
- `/workspace/bnu-ai-mentor-dashboard/src/data/processData.js` - 数据处理脚本
- 生成的JSON数据文件（将被覆盖）
