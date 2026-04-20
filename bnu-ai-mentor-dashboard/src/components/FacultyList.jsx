import React from 'react'

const FacultyList = ({ facultyData, onFacultySelect, searchTerm, onSearchChange }) => {
  return (
    <div className="faculty-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="搜索导师姓名或研究方向"
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
            <h3>{faculty.name}</h3>
            <p className="title">{faculty.title}</p>
            <p className="direction">{faculty.researchDirection}</p>
            <div className="stats">
              <span>论文数: {faculty.paperCount}</span>
              <span>引用数: {faculty.citationCount}</span>
              <span>H指数: {faculty.hIndex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FacultyList
