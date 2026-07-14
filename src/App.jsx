import { useState, useCallback, useRef } from 'react'
import Machine from './components/Machine.jsx'
import PredictionModal from './components/PredictionModal.jsx'
import { getRandomPrediction } from './utils/randomizer.js'
import { useHaptic } from './hooks/useHaptic.js'
import decorImg from './assets/sprites/decor.png'
import MusicPlayer from './components/MusicPlayer.jsx'
import AuthorButton from './components/AuthorButton.jsx'
import FeedbackButton from './components/FeedbackButton.jsx'
import './App.css'

// Фазы автомата (упрощено: ручку убрали — монетка сразу запускает выдачу):
// idle          — ждём монетку
// dispensing    — шарик падает по жёлобу
// opened        — шарик открыт, показываем текст предсказания
const PHASES = {
  IDLE: 'idle',
  DISPENSING: 'dispensing',
  OPENED: 'opened',
}

const DISPENSE_DURATION_MS = 650 // должно совпадать с анимацией .gumball--falling в Gumball.css

export default function App() {
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [prediction, setPrediction] = useState(null)
  const haptic = useHaptic()
  const dispenseTimeoutRef = useRef(null)

  const handleCoinInsert = useCallback(() => {
    haptic.tick()

    const next = getRandomPrediction()
    setPrediction(next)
    setPhase(PHASES.DISPENSING)

    clearTimeout(dispenseTimeoutRef.current)
    dispenseTimeoutRef.current = setTimeout(() => {
      setPhase(PHASES.OPENED)
      haptic.success()
    }, DISPENSE_DURATION_MS)
  }, [haptic])

  const handleReset = useCallback(() => {
    setPhase(PHASES.IDLE)
    setPrediction(null)
  }, [])

  return (
    <div className="app-shell">
      <div className="app-bg" />

      <div className="app-stage">
        <img src={decorImg} alt="Bubblegum!" className="app-decor" draggable={false} />
        <Machine
          phase={phase}
          prediction={prediction}
          onCoinInsert={handleCoinInsert}
        />
      </div>

      {phase === PHASES.OPENED && (
        <PredictionModal prediction={prediction} onReset={handleReset} />
      )}

      <MusicPlayer />
      <AuthorButton />
      <FeedbackButton />
    </div>
  )
}
