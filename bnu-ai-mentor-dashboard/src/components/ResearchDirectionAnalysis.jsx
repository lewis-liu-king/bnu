import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const ResearchDirectionAnalysis = ({ faculty }) => {
  const radarRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (!faculty) return

    // 提取研究方向关键词
    const direction = faculty.researchDirection
    if (!direction) return

    // 简单处理研究方向字符串，提取关键词
    const keywords = direction.split('、').map(keyword => keyword.trim()).filter(k => k)
    
    if (keywords.length === 0) return

    // 构建雷达图数据 - 根据论文数量简单设置权重
    const maxValue = Math.max(faculty.paperCount, 100)
    const radarData = {
      indicator: keywords.map((keyword, index) => ({
        name: keyword.length > 8 ? keyword.substring(0, 8) + '...' : keyword,
        max: maxValue
      })),
      value: keywords.map((_, index) => 
        Math.max(10, Math.floor(maxValue * (1 - index * 0.1)))
      )
    }

    // 构建条形图数据
    const barData = keywords.map((keyword, index) => ({
      name: keyword,
      value: keywords.length - index
    }))

    // 初始化雷达图
    if (radarRef.current) {
      const radarChart = echarts.init(radarRef.current)
      const radarOption = {
        title: {
          text: '研究方向分布雷达图',
          left: 'center',
          textStyle: {
            color: '#2d3748',
            fontSize: 18,
            fontWeight: 600
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#e2e8f0',
          textStyle: {
            color: '#2d3748'
          }
        },
        radar: {
          indicator: radarData.indicator,
          center: ['50%', '55%'],
          radius: '65%',
          axisName: {
            color: '#4a5568',
            fontSize: 12
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(102, 126, 234, 0.05)', 'rgba(102, 126, 234, 0.1)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e2e8f0'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: radarData.value,
            name: faculty.name,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(102, 126, 234, 0.4)' },
                  { offset: 1, color: 'rgba(118, 75, 162, 0.4)' }
                ]
              }
            },
            lineStyle: {
              color: '#667eea'
            },
            itemStyle: {
              color: '#667eea'
            }
          }]
        }]
      }
      radarChart.setOption(radarOption)

      const handleRadarResize = () => radarChart.resize()
      window.addEventListener('resize', handleRadarResize)
      
      const radarCleanup = () => {
        window.removeEventListener('resize', handleRadarResize)
        radarChart.dispose()
      }

      return radarCleanup
    }

    // 初始化条形图
    if (barRef.current && barData.length > 0) {
      const barChart = echarts.init(barRef.current)
      const barOption = {
        title: {
          text: '研究方向重要性排序',
          left: 'center',
          textStyle: {
            color: '#2d3748',
            fontSize: 18,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#e2e8f0',
          textStyle: {
            color: '#2d3748'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              color: '#f1f5f9'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: barData.map(item => item.name),
          axisLine: {
            lineStyle: {
              color: '#e2e8f0'
            }
          },
          axisLabel: {
            color: '#4a5568',
            fontSize: 11
          }
        },
        series: [{
          type: 'bar',
          data: barData.map(item => ({
            value: item.value,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#667eea' },
                  { offset: 1, color: '#764ba2' }
                ]
              },
              borderRadius: [0, 4, 4, 0]
            }
          })),
          barWidth: '60%'
        }]
      }
      barChart.setOption(barOption)

      const handleBarResize = () => barChart.resize()
      window.addEventListener('resize', handleBarResize)
      
      return () => {
        window.removeEventListener('resize', handleBarResize)
        barChart.dispose()
      }
    }
  }, [faculty])

  if (!faculty || !faculty.researchDirection) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📚</div>
        <p>暂无研究方向数据</p>
      </div>
    )
  }

  return (
    <div className="research-direction-analysis">
      <div className="chart-container">
        <div ref={radarRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
      <div className="chart-container">
        <div ref={barRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  )
}

export default ResearchDirectionAnalysis
