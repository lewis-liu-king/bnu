import { useState, useEffect } from 'react'
import FacultyList from './components/FacultyList'
import FacultyDetail from './components/FacultyDetail'
import FilterComponent from './components/FilterComponent'
import ExportComponent from './components/ExportComponent'
import './App.css'

function App() {
  const [facultyData, setFacultyData] = useState([])
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    title: '',
    isPhDAdvisor: '',
    isMasterAdvisor: '',
    campus: '',
    minPapers: '',
    minHIndex: ''
  })

  useEffect(() => {
    // 加载导师数据
    import('./data/facultyData.json')
      .then(data => setFacultyData(data.default))
      .catch(err => console.error('加载数据失败:', err))
  }, [])

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty)
  }

  const handleBackToList = () => {
    setSelectedFaculty(null)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const filteredFaculty = facultyData.filter(faculty => {
    // 搜索条件
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.researchDirection.toLowerCase().includes(searchTerm.toLowerCase())
    
    // 筛选条件
    const matchesTitle = !filters.title || faculty.title === filters.title
    const matchesPhDAdvisor = !filters.isPhDAdvisor || faculty.isPhDAdvisor === (filters.isPhDAdvisor === 'true')
    const matchesMasterAdvisor = !filters.isMasterAdvisor || faculty.isMasterAdvisor === (filters.isMasterAdvisor === 'true')
    const matchesCampus = !filters.campus || faculty.campus === filters.campus
    const matchesMinPapers = !filters.minPapers || faculty.paperCount >= parseInt(filters.minPapers)
    const matchesMinHIndex = !filters.minHIndex || faculty.hIndex >= parseInt(filters.minHIndex)
    
    return matchesSearch && matchesTitle && matchesPhDAdvisor && matchesMasterAdvisor && matchesCampus && matchesMinPapers && matchesMinHIndex
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>北京师范大学人工智能学院导师信息可视化系统</h1>
      </header>
      <main>
        {selectedFaculty ? (
          <>
            <ExportComponent 
              facultyData={facultyData} 
              selectedFaculty={selectedFaculty} 
            />
            <FacultyDetail 
              faculty={selectedFaculty} 
              onBack={handleBackToList} 
            />
          </>
        ) : (
          <>
            <ExportComponent 
              facultyData={facultyData} 
              selectedFaculty={selectedFaculty} 
            />
            <FilterComponent 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
            <FacultyList 
              facultyData={filteredFaculty} 
              onFacultySelect={handleFacultySelect} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </>
        )}
      </main>
      <footer>
        <p>© 2026 北师大AI学院导师信息可视化系统</p>
      </footer>
    </div>
  )
}

export default App
