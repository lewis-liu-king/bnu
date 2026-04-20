import React, { useState } from 'react'
import PaperVisualization from './PaperVisualization'
import ResearchDirectionAnalysis from './ResearchDirectionAnalysis'

const FacultyDetail = ({ faculty, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  if (!faculty) return null

  return (
    <div className="faculty-detail-container">
      <button className="back-button" onClick={onBack}>
        ← 返回导师列表
      </button>
      
      <div className="faculty-header">
        <div className="faculty-avatar">
          {faculty.name.charAt(0)}
        </div>
        <div className="faculty-info-header">
          <h2>{faculty.name}</h2>
          <p className="title">
            {faculty.title} 
            {faculty.englishName && <span style={{ opacity: 0.7, marginLeft: '8px' }}>
              ({faculty.englishName})
            </span>}
          </p>
          <p className="research-direction">
            🎯 {faculty.researchDirection || '暂无研究方向信息'}
          </p>
        </div>
        <div className="faculty-actions">
          <button 
            className={`action-button favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '⭐ 已收藏' : '☆ 收藏'}
          </button>
          {faculty.homepage && (
            <a 
              href={faculty.homepage} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button"
              style={{ textDecoration: 'none' }}
            >
              🔗 个人主页
            </a>
          )}
        </div>
      </div>
      
      <div className="faculty-info">
        {/* 学术指标 */}
        <div className="info-section">
          <h3>📊 学术指标</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{faculty.paperCount}</span>
              <span className="stat-label">论文总数</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{faculty.citationCount.toLocaleString()}</span>
              <span className="stat-label">总引用数</span>
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

        {/* 基本信息 */}
        <div className="info-section">
          <h3>📋 基本信息</h3>
          <div className="info-grid">
            {faculty.level && (
              <div className="info-item">
                <label>级别</label>
                <span>{faculty.level}</span>
              </div>
            )}
            <div className="info-item">
              <label>博士生导师</label>
              <span>{faculty.isPhDAdvisor ? '✅ 是' : '❌ 否'}</span>
            </div>
            <div className="info-item">
              <label>硕士生导师</label>
              <span>{faculty.isMasterAdvisor ? '✅ 是' : '❌ 否'}</span>
            </div>
            {faculty.campus && (
              <div className="info-item">
                <label>校区</label>
                <span>📍 {faculty.campus}</span>
              </div>
            )}
            {faculty.email && (
              <div className="info-item">
                <label>邮箱</label>
                <span style={{ wordBreak: 'break-all' }}>📧 {faculty.email}</span>
              </div>
            )}
            {faculty.orcid && (
              <div className="info-item">
                <label>ORCID</label>
                <a 
                  href={`https://orcid.org/${faculty.orcid}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  🔗 {faculty.orcid}
                </a>
              </div>
            )}
            {faculty.notes && (
              <div className="info-item" style={{ gridColumn: '1/-1' }}>
                <label>备注</label>
                <span>{faculty.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* 研究方向分析 */}
        {faculty.researchDirection && (
          <div className="info-section">
            <h3>🎯 研究方向分析</h3>
            <ResearchDirectionAnalysis faculty={faculty} />
          </div>
        )}

        {/* 论文数据可视化 */}
        {faculty.papers.length > 0 && (
          <div className="info-section">
            <h3>📈 论文数据可视化</h3>
            <PaperVisualization papers={faculty.papers} />
          </div>
        )}

        {/* 论文列表 */}
        {faculty.papers.length > 0 && (
          <div className="info-section">
            <h3>📚 论文列表 ({faculty.papers.length} 篇)</h3>
            <div className="papers-list">
              {faculty.papers.map((paper, index) => (
                <div key={paper.id} className="paper-item">
                  <h4>{paper.title}</h4>
                  <div className="paper-meta">
                    <span>📅 {paper.year}</span>
                    {paper.venue && <span>🏛️ {paper.venue}</span>}
                    <span>📊 引用: {paper.citationCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FacultyDetail
