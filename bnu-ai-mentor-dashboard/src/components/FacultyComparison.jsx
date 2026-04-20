import React, { useState } from 'react'

const FacultyComparison = ({ facultyData, onBack }) => {
  const [selectedFaculty, setSelectedFaculty] = useState([])

  // 切换选择
  const toggleSelection = (faculty) => {
    if (selectedFaculty.find(f => f.id === faculty.id)) {
      setSelectedFaculty(selectedFaculty.filter(f => f.id !== faculty.id))
    } else if (selectedFaculty.length < 5) {
      // 最多对比5位导师
      setSelectedFaculty([...selectedFaculty, faculty])
    }
  }

  // 从对比中移除
  const removeFromComparison = (id) => {
    setSelectedFaculty(selectedFaculty.filter(f => f.id !== id))
  }

  // 找出每项指标的最大值
  const getMaxValue = (key) => {
    return Math.max(...selectedFaculty.map(f => f[key] || 0))
  }

  // 对比的指标
  const comparisonMetrics = [
    { key: 'paperCount', label: '论文数量', format: (v) => v.toLocaleString() },
    { key: 'citationCount', label: '引用数量', format: (v) => v.toLocaleString() },
    { key: 'hIndex', label: 'H指数', format: (v) => v },
    { key: 'i10Index', label: 'i10指数', format: (v) => v }
  ]

  return (
    <div>
      <button className="back-button" onClick={onBack}>
        ← 返回导师列表
      </button>

      {/* 选择导师部分 */}
      <div className="compare-section">
        <div className="compare-section-header">
          <h3>选择要对比的导师（最多5位）</h3>
          <span style={{ color: '#64748b' }}>
            已选择: {selectedFaculty.length}/5
          </span>
        </div>
        
        <div className="compare-grid">
          {facultyData.map((faculty) => (
            <div 
              key={faculty.id}
              className={`compare-card ${
                selectedFaculty.find(f => f.id === faculty.id) ? 'selected' : ''
              }`}
              onClick={() => toggleSelection(faculty)}
            >
              <input 
                type="checkbox" 
                className="compare-checkbox"
                checked={selectedFaculty.find(f => f.id === faculty.id) !== undefined}
                onChange={() => toggleSelection(faculty)}
              />
              <div className="compare-info">
                <div className="compare-name">{faculty.name}</div>
                <div className="compare-title">{faculty.title} • {faculty.researchDirection}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 对比结果 */}
      {selectedFaculty.length >= 2 && (
        <div className="compare-result">
          <div className="compare-result-header">
            <h3>对比结果</h3>
            <button className="close-compare" onClick={() => setSelectedFaculty([])}>
              ✕
            </button>
          </div>

          <div className="compare-table">
            <table>
              <thead>
                <tr>
                  <th>指标</th>
                  {selectedFaculty.map(f => (
                    <th key={f.id}>{f.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 基本信息 */}
                <tr>
                  <td>职称</td>
                  {selectedFaculty.map(f => (
                    <td key={f.id}>{f.title}</td>
                  ))}
                </tr>
                <tr>
                  <td>研究方向</td>
                  {selectedFaculty.map(f => (
                    <td key={f.id}>{f.researchDirection || '-'}</td>
                  ))}
                </tr>
                <tr>
                  <td>博士生导师</td>
                  {selectedFaculty.map(f => (
                    <td key={f.id}>{f.isPhDAdvisor ? '✅ 是' : '❌ 否'}</td>
                  ))}
                </tr>
                <tr>
                  <td>硕士生导师</td>
                  {selectedFaculty.map(f => (
                    <td key={f.id}>{f.isMasterAdvisor ? '✅ 是' : '❌ 否'}</td>
                  ))}
                </tr>

                {/* 统计指标 */}
                {comparisonMetrics.map(metric => {
                  const maxValue = getMaxValue(metric.key)
                  return (
                    <tr key={metric.key}>
                      <td>{metric.label}</td>
                      {selectedFaculty.map(f => {
                        const value = f[metric.key] || 0
                        const isBest = value === maxValue && maxValue > 0
                        return (
                          <td key={f.id} className={isBest ? 'highlight-best' : ''}>
                            {metric.format(value)}
                            {isBest && ' 🏆'}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      {selectedFaculty.length === 1 && (
        <div style={{ 
          background: '#fef3c7', 
          padding: '16px 24px', 
          borderRadius: '12px',
          marginTop: '24px',
          color: '#92400e',
          border: '1px solid #fcd34d'
        }}>
          💡 请再选择至少一位导师进行对比
        </div>
      )}
    </div>
  )
}

export default FacultyComparison
