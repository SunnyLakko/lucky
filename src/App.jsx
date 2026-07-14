import { useState, useCallback, useRef, useEffect } from 'react'
import { AchievementsProvider, useAchievements } from './contexts/AchievementsContext.jsx'
import Machine from './components/Machine.jsx'
import PredictionModal from './components/PredictionModal.jsx'
import WelcomeModal from './components/WelcomeModal.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import ProfileButton from './components/ProfileButton.jsx'
import StatsDisplay from './components/StatsDisplay.jsx'
import { getRandomPrediction } from './utils/randomizer.js'
import { useHaptic } from './hooks/useHaptic.js'
import { useAudioManager } from './hooks/useAudioManager.js'
import decorImg from './assets/sprites/decor.png'
import MusicPlayer from './components/MusicPlayer.jsx'
import AuthorButton from './components/AuthorButton.jsx'
import FeedbackButton from './components/FeedbackButton.jsx'
import AchievementToasts from './components/AchievementToasts.jsx'
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
  return (
    <AchievementsProvider>
      <AppContent />
    </AchievementsProvider>
  )
}

function AppContent() {
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [prediction, setPrediction] = useState(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [changeProfileModalOpen, setChangeProfileModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [currentBgId, setCurrentBgId] = useState(1)
  
  const haptic = useHaptic()
  const { clickAudioRef, coinAudioRef, playClickSound, playCoinSound } = useAudioManager()
  const { unlockAchievement } = useAchievements()
  const dispenseTimeoutRef = useRef(null)

  // Проверяем, создан ли профиль при загрузке
  useEffect(() => {
    const saved = localStorage.getItem('userProfile')
    if (!saved) {
      setProfileModalOpen(true)
    } else {
      setUserProfile(JSON.parse(saved))
    }

    // Добавляем глобальный обработчик для звука при нажатии на кнопки
    const handleGlobalClick = (e) => {
      // Не проигрываем звук при клике на аудио элементы или определенные кнопки
      if (e.target.tagName === 'AUDIO') return
      if (e.target.closest('.machine__slot-hitbox')) return // Отдельный звук для монетки

      playClickSound()
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [playClickSound])

  const handleCoinInsert = useCallback(() => {
    playClickSound()
    playCoinSound()
    haptic.tick()

    const next = getRandomPrediction()
    setPrediction(next)
    setPhase(PHASES.DISPENSING)

    // Проверяем достижение "Дзынь!" (первая монетка)
    const coinCount = parseInt(localStorage.getItem('gumball_count') || '0', 10)
    if (coinCount === 1) {
      unlockAchievement('first_coin')
    }

    // Проверяем достижение для фиолетового/синего шарика
    if (next.color === 'purple' || next.color === 'blue') {
      unlockAchievement('purple_ball')
    }

    // Проверяем достижение "Комбо" (10 жвачек)
    if (coinCount === 10) {
      unlockAchievement('combo_10')
    }

    clearTimeout(dispenseTimeoutRef.current)
    dispenseTimeoutRef.current = setTimeout(() => {
      setPhase(PHASES.OPENED)
      haptic.success()
    }, DISPENSE_DURATION_MS)
  }, [haptic, playClickSound, playCoinSound])

  const handleReset = useCallback(() => {
    playClickSound()
    setPhase(PHASES.IDLE)
    setPrediction(null)
  }, [playClickSound])

  const handleProfileCreate = useCallback((profile) => {
    setUserProfile(profile)
    setProfileModalOpen(false)
  }, [])

  const handleBackgroundChange = useCallback((bgId) => {
    setCurrentBgId(bgId)
  }, [])

  return (
    <div className="app-shell">
      {/* Audio elements для звуковых эффектов */}
      <audio ref={clickAudioRef} src="/lucky/click.wav" preload="auto" />
      <audio ref={coinAudioRef} src="/lucky/coin_insert.wav" preload="auto" />

      {/* Фон (можно менять без инверсии) */}
      <div 
        className="app-bg" 
        style={{
          backgroundImage: `url(/lucky/background${currentBgId}.png)`,
        }}
      />

      {/* UI компоненты */}
      <StatsDisplay />
      <ProfileButton 
        userProfile={userProfile ? {
          username: userProfile.username,
          avatarSrc: userProfile.avatarId ? `/lucky/pfp${userProfile.avatarId}.webm` : ''
        } : null}
        onChangeProfile={() => setChangeProfileModalOpen(true)}
        onBackgroundChange={handleBackgroundChange}
      />

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
      <AchievementToasts />

      {/* Модальные окна */}
      <WelcomeModal onClose={() => {}} />
      <ProfileModal isOpen={profileModalOpen} onProfileCreate={handleProfileCreate} />
      <ProfileModal isOpen={changeProfileModalOpen} onProfileCreate={(profile) => {
        handleProfileCreate(profile)
        setChangeProfileModalOpen(false)
      }} />
    </div>
  )
}
