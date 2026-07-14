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

export default function AchievementToasts() {
  const { newAchievements } = useAchievements()

  if (!newAchievements.length) return null

  return (
    <div className="achievements-notifications">
      {newAchievements.map((entry) => {
        const achievement = ACHIEVEMENTS.find((item) => item.id === entry.achievementId)
        if (!achievement) return null

        return (
          <div key={entry.id} className="achievement-notification">
            <span className="achievement-notification__emoji">⭐</span>
            <div className="achievement-notification__content">
              <p className="achievement-notification__title">Новое достижение!</p>
              <p className="achievement-notification__name">{achievement.title}</p>
              <p className="achievement-notification__desc">{achievement.description}</p>
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
  )
}
