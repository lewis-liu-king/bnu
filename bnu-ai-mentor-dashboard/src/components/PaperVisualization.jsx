import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const PaperVisualization = ({ papers }) => {
  const trendChartRef = useRef(null)
  const citationChartRef = useRef(null)
  const fieldChartRef = useRef(null)

  useEffect(() => {
    if (!papers || papers.length === 0) return

    // 处理论文数据
    const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => a - b)
    const papersByYear = years.map(year => {
      const yearPapers = papers.filter(paper => paper.year === year)
      return {
        year,
        count: yearPapers.length,
        citations: yearPapers.reduce((sum, paper) => sum + paper.citationCount, 0)
      }
    })

    // 处理研究领域数据
    const fieldMap = new Map()
    papers.forEach(paper => {
      if (paper.researchField) {
        try {
          const fields = JSON.parse(paper.researchField)
          fields.forEach(field => {
            if (field) {
              fieldMap.set(field, (fieldMap.get(field) || 0) + 1)
            }
          })
        } catch (e) {
          // 忽略解析错误
        }
      }
    })

    const fieldData = Array.from(fieldMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // 只取前10个领域

    // 初始化论文发表趋势图
    if (trendChartRef.current) {
      const trendChart = echarts.init(trendChartRef.current)
      const trendOption = {
        title: {
          text: '论文发表趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: papersByYear.map(item => item.year)
        },
        yAxis: {
          type: 'value',
          name: '论文数量'
        },
        series: [{
          data: papersByYear.map(item => item.count),
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#4a6fa5'
          }
        }]
      }
      trendChart.setOption(trendOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        trendChart.resize()
      })
    }

    // 初始化引用情况分析图
    if (citationChartRef.current) {
      const citationChart = echarts.init(citationChartRef.current)
      const citationOption = {
        title: {
          text: '引用情况分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: papersByYear.map(item => item.year)
        },
        yAxis: {
          type: 'value',
          name: '引用数量'
        },
        series: [{
          data: papersByYear.map(item => item.citations),
          type: 'bar',
          itemStyle: {
            color: '#4a6fa5'
          }
        }]
      }
      citationChart.setOption(citationOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        citationChart.resize()
      })
    }

    // 初始化研究领域分布饼图
    if (fieldChartRef.current && fieldData.length > 0) {
      const fieldChart = echarts.init(fieldChartRef.current)
      const fieldOption = {
        title: {
          text: '研究领域分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: fieldData.map(item => item[0])
        },
        series: [{
          name: '研究领域',
          type: 'pie',
          radius: '50%',
          data: fieldData.map(item => ({ name: item[0], value: item[1] })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      fieldChart.setOption(fieldOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        fieldChart.resize()
      })
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [papers])

  if (!papers || papers.length === 0) {
    return <p>暂无论文数据</p>
  }

  return (
    <div className="paper-visualization">
      <div className="chart-container">
        <div ref={trendChartRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
      <div className="chart-container">
        <div ref={citationChartRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
      <div className="chart-container">
        <div ref={fieldChartRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  )
}

export default PaperVisualization
