import React from 'react'

const FilterComponent = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="filter-container">
      <h3>筛选条件</h3>
      <div className="filter-form">
        <div className="filter-item">
          <label>职称:</label>
          <select 
            value={filters.title} 
            onChange={(e) => handleFilterChange('title', e.target.value)}
          >
            <option value="">全部</option>
            <option value="教授">教授</option>
            <option value="副教授">副教授</option>
            <option value="讲师">讲师</option>
            <option value="高级工程师">高级工程师</option>
          </select>
        </div>
        <div className="filter-item">
          <label>博导:</label>
          <select 
            value={filters.isPhDAdvisor} 
            onChange={(e) => handleFilterChange('isPhDAdvisor', e.target.value)}
          >
            <option value="">全部</option>
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
        </div>
        <div className="filter-item">
          <label>硕导:</label>
          <select 
            value={filters.isMasterAdvisor} 
            onChange={(e) => handleFilterChange('isMasterAdvisor', e.target.value)}
          >
            <option value="">全部</option>
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
        </div>
        <div className="filter-item">
          <label>校区:</label>
          <select 
            value={filters.campus} 
            onChange={(e) => handleFilterChange('campus', e.target.value)}
          >
            <option value="">全部</option>
            <option value="北京">北京</option>
            <option value="珠海">珠海</option>
          </select>
        </div>
        <div className="filter-item">
          <label>论文数量最小值:</label>
          <input 
            type="number" 
            value={filters.minPapers || ''} 
            onChange={(e) => handleFilterChange('minPapers', e.target.value)}
            placeholder="论文数量"
          />
        </div>
        <div className="filter-item">
          <label>H指数最小值:</label>
          <input 
            type="number" 
            value={filters.minHIndex || ''} 
            onChange={(e) => handleFilterChange('minHIndex', e.target.value)}
            placeholder="H指数"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterComponent
