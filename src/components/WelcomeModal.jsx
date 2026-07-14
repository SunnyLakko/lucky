import { useEffect, useState } from 'react'
import './WelcomeModal.css'

export default function WelcomeModal({ onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Проверяем, был ли уже показан приветственный экран
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (hasSeenWelcome) {
      setIsVisible(false)
      onClose()
    }
  }, [onClose])

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true')
    setIsVisible(false)
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true">
      <div className="welcome-modal">
        <button className="welcome-modal__close" onClick={handleClose} aria-label="Закрыть">✕</button>
        
        <h1 className="welcome-modal__title">Привет!</h1>
        
        <p className="welcome-modal__text">
          Это мой первый пет-проект(для души) так что особо строго не судите :)
        </p>

        <p className="welcome-modal__text">
          Буду очень рад, если ты заглянешь, покрутишь автомат и испытаешь свою удачу!
        </p>

        <div className="welcome-modal__section">
          <p className="welcome-modal__label">Связь со мной (можно поболтать):</p>
          <a href="https://t.me/miku_sama" className="welcome-modal__link" target="_blank" rel="noopener noreferrer">
            https://t.me/miku_sama
          </a>
        </div>

        <p className="welcome-modal__text">
          Я благодарен за любой отзыв, критику кода или просто оценку интерфейса.
        </p>

        <p className="welcome-modal__text">
          Спасибо, что разделяешь со мной этот шаг!
        </p>

        <p className="welcome-modal__footer">
          Мне будет очень приятно (ᴖ◡ᴖ)
        </p>

        <button className="welcome-modal__button" onClick={handleClose}>
          Начать играть
        </button>
      </div>
    </div>
  )
}
