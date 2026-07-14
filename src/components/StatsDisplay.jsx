import { useState, useEffect } from 'react'
import { getTotalChances, getTotalGumballCount } from '../utils/randomizer.js'
import './StatsDisplay.css'

export default function StatsDisplay() {
  const [chances, setChances] = useState(0)
  const [gumballCount, setGumballCount] = useState(0)

  // Обновляем статистику при загрузке
  useEffect(() => {
    setChances(getTotalChances())
    setGumballCount(getTotalGumballCount())

    // Слушаем события storage для обновления в реальном времени
    const handleStorageChange = () => {
      setChances(getTotalChances())
      setGumballCount(getTotalGumballCount())
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Вероятность золотого шарика (примерно 2%)
  const goldenBallChance = 2

  return (
    <div className="stats-display">
      <div className="stats-item">
        <span className="stats-label">Попыток:</span>
        <span className="stats-value">{chances}</span>
      </div>

      <div className="stats-item">
        <span className="stats-label">Жвачек:</span>
        <span className="stats-value">{gumballCount}</span>
      </div>

      <div className="stats-item stats-item--golden">
        <span className="stats-label">Золотой шар:</span>
        <span className="stats-value">{goldenBallChance}%</span>
      </div>
    </div>
  )
}
