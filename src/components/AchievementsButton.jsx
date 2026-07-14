import { useState } from 'react'
import { useAchievements } from '../contexts/AchievementsContext.jsx'
import './AchievementsButton.css'

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

export default function AchievementsButton({ inline = false }) {
  const { unlockedAchievements } = useAchievements()
  const [showModal, setShowModal] = useState(false)

  const buttonClassName = inline ? 'achievements-btn achievements-btn--inline' : 'achievements-btn'

  return (
    <>
      <button
        className={buttonClassName}
        onClick={() => setShowModal(true)}
        title="Посмотреть достижения"
      >
        <span className="achievements-btn__emoji">🏆</span>
        {inline && <span className="achievements-btn__label">Достижения</span>}
        <span className="achievements-btn__count">
          {unlockedAchievements.size}/{ACHIEVEMENTS.length}
        </span>
      </button>

      {showModal && (
        <div className="achievements-modal-full" onClick={() => setShowModal(false)}>
          <div className="achievements-modal-full__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="achievements-modal-full__close"
              onClick={() => setShowModal(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>

            <h2 className="achievements-modal-full__title">Достижения</h2>

            <div className="achievements-modal-full__grid">
              {ACHIEVEMENTS.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-item ${
                    unlockedAchievements.has(achievement.id)
                      ? 'achievement-item--unlocked'
                      : 'achievement-item--locked'
                  }`}
                >
                  <div className="achievement-item__icon-wrapper">
                    <img
                      src={`/lucky/archivenments/${achievement.icon}`}
                      alt={achievement.title}
                      className="achievement-item__icon"
                    />
                  </div>
                  <h3 className="achievement-item__title">{achievement.title}</h3>
                  <p className="achievement-item__description">{achievement.description}</p>
                </div>
              ))}
            </div>

            <button
              className="achievements-modal-full__button"
              onClick={() => setShowModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}
