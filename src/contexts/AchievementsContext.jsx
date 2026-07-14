import { createContext, useContext, useCallback, useState } from 'react'

const AchievementsContext = createContext()

export function AchievementsProvider({ children }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('unlockedAchievements')
      return new Set(saved ? JSON.parse(saved) : [])
    } catch {
      return new Set()
    }
  })

  const [newAchievements, setNewAchievements] = useState([])

  const unlockAchievement = useCallback((achievementId) => {
    let isNewUnlock = false

    setUnlockedAchievements((prev) => {
      if (prev.has(achievementId)) return prev

      isNewUnlock = true
      const next = new Set(prev)
      next.add(achievementId)
      localStorage.setItem('unlockedAchievements', JSON.stringify([...next]))
      return next
    })

    if (!isNewUnlock) return

    const notificationId = `${achievementId}-${Date.now()}`
    setNewAchievements((prev) => [...prev, { id: notificationId, achievementId }])

    setTimeout(() => {
      setNewAchievements((prev) => prev.filter((entry) => entry.id !== notificationId))
    }, 3000)
  }, [])

  return (
    <AchievementsContext.Provider
      value={{
        unlockedAchievements,
        newAchievements,
        unlockAchievement,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  )
}

export function useAchievements() {
  const context = useContext(AchievementsContext)
  if (!context) {
    throw new Error('useAchievements must be used within AchievementsProvider')
  }
  return context
}
