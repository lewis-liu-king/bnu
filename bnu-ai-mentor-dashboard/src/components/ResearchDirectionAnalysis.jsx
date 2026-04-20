import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const ResearchDirectionAnalysis = ({ faculty }) => {
  const tagCloudRef = useRef(null)
  const treeRef = useRef(null)

  useEffect(() => {
    if (!faculty) return

    // 提取研究方向关键词
    const direction = faculty.researchDirection
    if (!direction) return

    // 简单处理研究方向字符串，提取关键词
    const keywords = direction.split('、').map(keyword => keyword.trim())
    
    // 构建标签云数据
    const tagCloudData = keywords.map((keyword, index) => ({
      name: keyword,
      value: 100 - index * 5 // 简单设置权重
    }))

    // 构建树状图数据
    const treeData = {
      name: faculty.name,
      children: keywords.map(keyword => ({
        name: keyword
      }))
    }

    // 初始化标签云
    if (tagCloudRef.current) {
      const tagCloudChart = echarts.init(tagCloudRef.current)
      const tagCloudOption = {
        title: {
          text: '研究方向标签云',
          left: 'center'
        },
        tooltip: {},
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '80%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [12, 50],
          rotationRange: [-45, 45],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 255)
              ].join(',') + ')'
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: tagCloudData
        }]
      }
      tagCloudChart.setOption(tagCloudOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        tagCloudChart.resize()
      })
    }

    // 初始化树状图
    if (treeRef.current) {
      const treeChart = echarts.init(treeRef.current)
      const treeOption = {
        title: {
          text: '研究方向层次结构',
          left: 'center'
        },
        tooltip: {},
        series: [{
          type: 'tree',
          data: [treeData],
          top: '10%',
          left: '7%',
          bottom: '10%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }]
      }
      treeChart.setOption(treeOption)

      // 响应式调整
      window.addEventListener('resize', () => {
        treeChart.resize()
      })
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [faculty])

  if (!faculty || !faculty.researchDirection) {
    return <p>暂无研究方向数据</p>
  }

  return (
    <div className="research-direction-analysis">
      <div className="chart-container">
        <div ref={tagCloudRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
      <div className="chart-container">
        <div ref={treeRef} style={{ width: '100%', height: '400px' }}></div>
      </div>
    </div>
  )
}

export default ResearchDirectionAnalysis
