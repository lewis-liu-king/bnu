import React from 'react'

const ExportComponent = ({ facultyData, selectedFaculty }) => {
  // 导出CSV文件的函数
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return

    // 获取所有字段名
    const headers = Object.keys(data[0])

    // 生成CSV内容
    const csvContent = [
      headers.join(','), // 头部
      ...data.map(row => headers.map(header => {
        const value = row[header]
        // 处理包含逗号或引号的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(','))
    ].join('\n')

    // 创建Blob对象
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    // 创建下载链接
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // 导出所有导师信息
  const handleExportAllFaculty = () => {
    const exportData = facultyData.map(faculty => ({
      姓名: faculty.name,
      英文名: faculty.englishName,
      职称: faculty.title,
      级别: faculty.level,
      博导: faculty.isPhDAdvisor ? '是' : '否',
      硕导: faculty.isMasterAdvisor ? '是' : '否',
      研究方向: faculty.researchDirection,
      邮箱: faculty.email || '',
      个人主页: faculty.homepage || '',
      校区: faculty.campus,
      备注: faculty.notes || '',
      论文数: faculty.paperCount,
      引用数: faculty.citationCount,
      H指数: faculty.hIndex,
      i10指数: faculty.i10Index,
      ORCID: faculty.orcid || ''
    }))
    exportToCSV(exportData, '北师大AI学院导师信息.csv')
  }

  // 导出选中导师的论文数据
  const handleExportFacultyPapers = () => {
    if (!selectedFaculty || !selectedFaculty.papers || selectedFaculty.papers.length === 0) return

    const exportData = selectedFaculty.papers.map(paper => ({
      论文标题: paper.title,
      年份: paper.year,
      发表渠道: paper.venue,
      渠道类型: paper.venueType || '',
      引用数: paper.citationCount,
      研究领域: paper.researchField || ''
    }))
    exportToCSV(exportData, `${selectedFaculty.name}论文数据.csv`)
  }

  return (
    <div className="export-container">
      <div className="export-buttons">
        <button 
          className="export-button" 
          onClick={handleExportAllFaculty}
          disabled={facultyData.length === 0}
        >
          导出所有导师信息
        </button>
        {selectedFaculty && (
          <button 
            className="export-button" 
            onClick={handleExportFacultyPapers}
            disabled={!selectedFaculty.papers || selectedFaculty.papers.length === 0}
          >
            导出当前导师论文数据
          </button>
        )}
      </div>
    </div>
  )
}

export default ExportComponent
