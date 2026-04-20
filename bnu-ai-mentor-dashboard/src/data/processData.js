import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取CSV文件
function readCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = line.split(',');
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] ? values[index].trim() : '';
      });
      data.push(row);
    }
  }
  return data;
}

// 处理导师数据
function processFacultyData() {
  const facultyData = readCSV(path.join(__dirname, '../../../bnu_ai_faculty_overview.csv'));
  
  return facultyData.map(item => ({
    id: item.姓名,
    name: item.姓名,
    englishName: item.英文名,
    title: item.职称,
    level: item.级别,
    isPhDAdvisor: item.博导 === '1',
    isMasterAdvisor: item.硕导 === '1',
    researchDirection: item.研究方向,
    email: item.邮箱,
    homepage: item.个人主页,
    campus: item.校区,
    notes: item.备注,
    paperCount: parseInt(item.OA论文数) || 0,
    citationCount: parseInt(item.OA引用数) || 0,
    hIndex: parseInt(item.OA_H指数) || 0,
    i10Index: parseInt(item.OA_i10指数) || 0,
    orcid: item.ORCID
  }));
}

// 处理论文数据
function processPaperData() {
  const paperData = readCSV(path.join(__dirname, '../../../bnu_ai_all_papers.csv'));
  
  return paperData.map(item => ({
    id: `${item.导师}-${item.论文标题}-${item.年份}`,
    mentor: item.导师,
    title: item.论文标题,
    year: parseInt(item.年份) || 0,
    venue: item.发表渠道,
    venueType: item.渠道类型,
    citationCount: parseInt(item.引用数) || 0,
    researchField: item.研究领域
  }));
}

// 生成处理后的数据
function generateProcessedData() {
  const facultyData = processFacultyData();
  const paperData = processPaperData();
  
  // 按导师分组论文数据
  const papersByMentor = {};
  paperData.forEach(paper => {
    if (!papersByMentor[paper.mentor]) {
      papersByMentor[paper.mentor] = [];
    }
    papersByMentor[paper.mentor].push(paper);
  });
  
  // 为每个导师添加论文数据
  const facultyWithPapers = facultyData.map(faculty => ({
    ...faculty,
    papers: papersByMentor[faculty.name] || []
  }));
  
  // 保存处理后的数据
  fs.writeFileSync(
    path.join(__dirname, 'facultyData.json'),
    JSON.stringify(facultyWithPapers, null, 2),
    'utf8'
  );
  
  fs.writeFileSync(
    path.join(__dirname, 'paperData.json'),
    JSON.stringify(paperData, null, 2),
    'utf8'
  );
  
  console.log('数据处理完成！');
}

// 运行数据处理
generateProcessedData();
