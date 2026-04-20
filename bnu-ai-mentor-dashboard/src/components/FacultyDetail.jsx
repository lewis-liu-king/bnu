import React from 'react'
import PaperVisualization from './PaperVisualization'
import ResearchDirectionAnalysis from './ResearchDirectionAnalysis'

const FacultyDetail = ({ faculty, onBack }) => {
  if (!faculty) return null

  return (
    <div className="faculty-detail-container">
      <button className="back-button" onClick={onBack}>
        返回列表
      </button>
      <div className="faculty-header">
        <h2>{faculty.name} ({faculty.englishName})</h2>
        <p className="title">{faculty.title}</p>
      </div>
      <div className="faculty-info">
        <div className="info-section">
          <h3>基本信息</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>研究方向:</label>
              <span>{faculty.researchDirection}</span>
            </div>
            <div className="info-item">
              <label>职称:</label>
              <span>{faculty.title}</span>
            </div>
            <div className="info-item">
              <label>级别:</label>
              <span>{faculty.level}</span>
            </div>
            <div className="info-item">
              <label>博导:</label>
              <span>{faculty.isPhDAdvisor ? '是' : '否'}</span>
            </div>
            <div className="info-item">
              <label>硕导:</label>
              <span>{faculty.isMasterAdvisor ? '是' : '否'}</span>
            </div>
            <div className="info-item">
              <label>校区:</label>
              <span>{faculty.campus}</span>
            </div>
            <div className="info-item">
              <label>邮箱:</label>
              <span>{faculty.email || '暂无'}</span>
            </div>
            <div className="info-item">
              <label>个人主页:</label>
              <span>{faculty.homepage || '暂无'}</span>
            </div>
            <div className="info-item">
              <label>ORCID:</label>
              <span>{faculty.orcid || '暂无'}</span>
            </div>
            <div className="info-item">
              <label>备注:</label>
              <span>{faculty.notes || '暂无'}</span>
            </div>
          </div>
        </div>
        <div className="info-section">
          <h3>学术指标</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{faculty.paperCount}</span>
              <span className="stat-label">论文数</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{faculty.citationCount}</span>
              <span className="stat-label">引用数</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{faculty.hIndex}</span>
              <span className="stat-label">H指数</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{faculty.i10Index}</span>
              <span className="stat-label">i10指数</span>
            </div>
          </div>
        </div>
        <div className="info-section">
          <h3>研究方向分析</h3>
          <ResearchDirectionAnalysis faculty={faculty} />
        </div>
        <div className="info-section">
          <h3>论文数据可视化</h3>
          <PaperVisualization papers={faculty.papers} />
        </div>
        <div className="info-section">
          <h3>论文列表</h3>
          <div className="papers-list">
            {faculty.papers.length > 0 ? (
              faculty.papers.map((paper, index) => (
                <div key={paper.id} className="paper-item">
                  <h4>{index + 1}. {paper.title}</h4>
                  <p className="paper-meta">
                    {paper.year} | {paper.venue} | 引用数: {paper.citationCount}
                  </p>
                </div>
              ))
            ) : (
              <p>暂无论文数据</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyDetail
