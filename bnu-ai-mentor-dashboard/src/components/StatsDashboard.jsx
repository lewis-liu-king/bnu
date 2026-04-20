import React from 'react'

const StatsDashboard = ({ facultyData }) => {
  // 计算统计数据
  const totalFaculty = facultyData.length
  const totalPapers = facultyData.reduce((sum, f) => sum + f.paperCount, 0)
  const totalCitations = facultyData.reduce((sum, f) => sum + f.citationCount, 0)
  const avgHIndex = totalFaculty > 0 
    ? Math.round(facultyData.reduce((sum, f) => sum + f.hIndex, 0) / totalFaculty) 
    : 0
  
  // 计算有多少位导师是博导或硕导
  const phdAdvisors = facultyData.filter(f => f.isPhDAdvisor).length
  const masterAdvisors = facultyData.filter(f => f.isMasterAdvisor).length

  const stats = [
    {
      id: 1,
      icon: '👨‍🏫',
      value: totalFaculty,
      label: '总导师数',
      theme: 'primary',
      trend: '+12%'
    },
    {
      id: 2,
      icon: '📚',
      value: totalPapers.toLocaleString(),
      label: '总论文数',
      theme: 'secondary',
      trend: '+8%'
    },
    {
      id: 3,
      icon: '📊',
      value: totalCitations.toLocaleString(),
      label: '总引用数',
      theme: 'success',
      trend: '+15%'
    },
    {
      id: 4,
      icon: '🎯',
      value: avgHIndex,
      label: '平均H指数',
      theme: 'warning',
      trend: '+5%'
    }
  ]

  const extraStats = [
    { icon: '👨‍🎓', label: '博士生导师', value: phdAdvisors },
    { icon: '👩‍🎓', label: '硕士生导师', value: masterAdvisors }
  ]

  return (
    <div style={{ marginBottom: '32px' }}>
      <div className="stats-dashboard">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-card ${stat.theme}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-trend">
              <span>↑</span>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>
      
      {/* 额外统计 */}
      <div style={{ 
        marginTop: '24px', 
        display: 'flex', 
        gap: '16px', 
        flexWrap: 'wrap' 
      }}>
        {extraStats.map((stat, index) => (
          <div key={index} style={{ 
            background: 'white', 
            padding: '16px 24px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsDashboard
