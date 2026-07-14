import { useState } from 'react'
import BackgroundSwitcher from './BackgroundSwitcher.jsx'
import AchievementsButton from './AchievementsButton.jsx'
import './ProfileButton.css'

export default function ProfileButton({ userProfile, onChangeProfile, onBackgroundChange }) {
  const [showModal, setShowModal] = useState(false)

  if (!userProfile) return null

  return (
    <>
      <button
        className="profile-button"
        onClick={() => setShowModal(true)}
        title="Профиль"
      >
        <div className="profile-button__avatar">
          <video
            src={userProfile.avatarSrc}
            autoPlay
            loop
            muted
            className="profile-button__video"
          />
        </div>
        <span className="profile-button__name">{userProfile.username}</span>
      </button>

      {showModal && (
        <div className="profile-modal-full" onClick={() => setShowModal(false)}>
          <div className="profile-modal-full__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="profile-modal-full__close"
              onClick={() => setShowModal(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>

            <div className="profile-modal-full__avatar-container">
              <video
                src={userProfile.avatarSrc}
                autoPlay
                loop
                muted
                className="profile-modal-full__avatar"
              />
            </div>

            <h2 className="profile-modal-full__name">{userProfile.username}</h2>

            <div className="profile-settings">
              <div className="profile-settings__title">Настройки</div>
              <div className="profile-settings__group">
                <AchievementsButton inline />
                <BackgroundSwitcher onBackgroundChange={onBackgroundChange} inline />
              </div>
            </div>

            <div className="profile-modal-full__buttons-group">
              <button
                className="profile-modal-full__button"
                onClick={() => {
                  setShowModal(false)
                  onChangeProfile?.()
                }}
              >
                Переделать
              </button>

              <button
                className="profile-modal-full__button profile-modal-full__button--secondary"
                onClick={() => setShowModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
