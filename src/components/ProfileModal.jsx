import { useState, useEffect } from 'react'
import './ProfileModal.css'

const AVATARS = [
  { id: 1, src: '/lucky/pfp1.webm' },
  { id: 2, src: '/lucky/pfp2.webm' },
  { id: 3, src: '/lucky/pfp3.webm' },
]

export default function ProfileModal({ onProfileCreate, isOpen }) {
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Загрузим сохранённый профиль, если он есть
    const saved = localStorage.getItem('userProfile')
    if (saved) {
      const profile = JSON.parse(saved)
      setSelectedAvatar(profile.avatarId)
      setUsername(profile.username)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (username.trim().length < 1) {
      setError('Введи своё имя, милый!')
      return
    }

    if (username.trim().length > 20) {
      setError('Имя слишком длинное (максимум 20 символов)')
      return
    }

    const profile = {
      avatarId: selectedAvatar,
      username: username.trim(),
    }

    localStorage.setItem('userProfile', JSON.stringify(profile))
    onProfileCreate(profile)
  }

  if (!isOpen) return null

  return (
    <div className="profile-overlay" role="dialog" aria-modal="true">
      <div className="profile-modal">
        <h2 className="profile-modal__title">Создай свой профиль</h2>
        
        <form onSubmit={handleSubmit} className="profile-modal__form">
          
          <div className="profile-modal__section">
            <label className="profile-modal__label">Выбери аватарку:</label>
            <div className="profile-modal__avatars">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  className={`profile-modal__avatar ${
                    selectedAvatar === avatar.id ? 'profile-modal__avatar--selected' : ''
                  }`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  aria-label={`Аватар ${avatar.id}`}
                >
                  <video
                    src={avatar.src}
                    autoPlay
                    loop
                    muted
                    className="profile-modal__avatar-video"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="profile-modal__section">
            <label htmlFor="username" className="profile-modal__label">
              Как тебя зовут?
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="Введи своё имя..."
              maxLength="20"
              className="profile-modal__input"
              autoFocus
            />
            {error && <p className="profile-modal__error">{error}</p>}
          </div>

          <button type="submit" className="profile-modal__button">
            Создать профиль
          </button>
        </form>
      </div>
    </div>
  )
}
