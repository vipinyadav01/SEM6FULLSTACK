import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [nums, setNums] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (count > 0) {
      let nums = []
      for (let i = 0; i < count; i++) {
        nums.push(Math.floor(Math.random() * 100))
      }
      setNums(nums)
    } else {
      setNums([])
    }
  }, [count])

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
      theme === 'light' 
        ? 'bg-gradient-to-r from-blue-400 to-purple-500'
        : 'bg-gradient-to-r from-gray-900 to-purple-900'
    }`}>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="absolute top-4 right-4 p-3 rounded-full bg-opacity-20 backdrop-blur-lg bg-white text-white hover:bg-opacity-30 transition-all duration-300"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      <div className={`${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      } p-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-opacity-90`}>
        <div className={`text-8xl font-bold text-center mb-10 animate-pulse ${
          theme === 'light' 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
        }`}>
          {count}
        </div>
        
        <div className="flex gap-6 justify-center">
          <button 
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-2xl relative overflow-hidden"
            onClick={() => setCount(prev => prev + 1)}
          >
            <span className="relative z-10">Increment +</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
          
          <button 
            className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-2xl relative overflow-hidden"
            onClick={() => setCount(prev => Math.max(0, prev - 1))}
          >
            <span className="relative z-10">Decrement -</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
          </button>
        </div>

        <div className={`mt-8 p-6 ${
          theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
        } rounded-xl transition-all duration-300 ${nums.length > 0 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} text-xl font-semibold mb-4`}>
            Generated Numbers:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {nums.map((num, index) => (
              <span 
                key={index} 
                className={`px-4 py-2 ${
                  theme === 'light'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-purple-900 text-purple-200'
                } rounded-full font-medium transform hover:scale-110 transition-all duration-200 cursor-pointer`}
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
