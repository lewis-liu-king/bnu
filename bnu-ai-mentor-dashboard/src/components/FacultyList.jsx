import React from 'react'

const FacultyList = ({ facultyData, onFacultySelect, searchTerm, onSearchChange }) => {
  return (
    <div className="faculty-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 搜索导师姓名或研究方向"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="faculty-grid">
        {facultyData.map((faculty) => (
          <div 
            key={faculty.id} 
            className="faculty-card"
            onClick={() => onFacultySelect(faculty)}
          >
            <h3>
              👤 {faculty.name}
              {faculty.isPhDAdvisor && <span style={{ fontSize: '0.8rem', marginLeft: '8px' }}>🎓</span>}
            </h3>
            <p className="title">
              {faculty.title}
              {faculty.campus && <span style={{ marginLeft: '8px', opacity: 0.8 }}>📍 {faculty.campus}</span>}
            </p>
            <p className="direction">{faculty.researchDirection || '暂无研究方向信息'}</p>
            <div className="stats">
              <div className="stat-item">
                <span>论文</span>
                <span>{faculty.paperCount}</span>
              </div>
              <div className="stat-item">
                <span>引用</span>
                <span>{faculty.citationCount.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span>H指数</span>
                <span>{faculty.hIndex}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {facultyData.length === 0 && (
        <div className="empty-state" style={{ marginTop: '48px' }}>
          <div className="empty-state-icon">🔍</div>
          <p>没有找到匹配的导师</p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
            尝试调整搜索关键词或筛选条件
          </p>
        </div>
      )}
    </div>
  )
}

export default FacultyList
