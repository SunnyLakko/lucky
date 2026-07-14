import { useAchievements } from '../contexts/AchievementsContext.jsx'
import './AchievementsPanel.css'

const ACHIEVEMENTS = [
  {
    id: 'first_coin',
    title: 'Дзынь!',
    description: 'Скормить автомату первую монетку',
    icon: 'Дзынь!.png',
  },
  {
    id: 'purple_ball',
    title: 'Черничный вечер',
    description: 'Выбить фиолетовый/синий шарик',
    icon: 'Черничный вечер.png',
  },
  {
    id: 'combo_10',
    title: 'Комбо',
    description: 'Выбить 10 жвачек суммарно за всё время',
    icon: 'Комбо.png',
  },
]

export default function AchievementsPanel() {
  const { unlockedAchievements, newAchievements } = useAchievements()

  return (
    <>
      <div className="achievements-panel">
        <div className="achievements-panel__header">
          <h3 className="achievements-panel__title">Достижения</h3>
          <span className="achievements-panel__count">
            {unlockedAchievements.size} / {ACHIEVEMENTS.length}
          </span>
        </div>

        <div className="achievements-panel__grid">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-card ${
                unlockedAchievements.has(achievement.id) ? 'achievement-card--unlocked' : 'achievement-card--locked'
              }`}
              title={achievement.description}
            >
              <img
                src={`/lucky/archivenments/${achievement.icon}`}
                alt={achievement.title}
                className="achievement-card__icon"
              />
              <p className="achievement-card__title">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Уведомления о новых достижениях внизу экрана */}
      <div className="achievements-notifications">
        {newAchievements.map((achievementId) => {
          const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId)
          if (!achievement) return null

          return (
            <div key={achievementId} className="achievement-notification">
              <span className="achievement-notification__emoji">⭐</span>
              <div className="achievement-notification__content">
                <p className="achievement-notification__title">Новое достижение!</p>
                <p className="achievement-notification__name">{achievement.title}</p>
              </div>
              <img
                src={`/lucky/archivenments/${achievement.icon}`}
                alt={achievement.title}
                className="achievement-notification__icon"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
