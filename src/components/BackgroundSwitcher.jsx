import { useState, useEffect } from 'react'
import './BackgroundSwitcher.css'

const BACKGROUNDS = [
  { id: 1, name: 'Фон 1' },
  { id: 2, name: 'Фон 2' },
  { id: 3, name: 'Фон 3' },
  { id: 4, name: 'Фон 4' },
]

export default function BackgroundSwitcher({ onBackgroundChange, inline = false }) {
  const [currentBg, setCurrentBg] = useState(1)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('selectedBackground')
    if (saved) {
      const bgId = parseInt(saved, 10)
      setCurrentBg(bgId)
      onBackgroundChange?.(bgId)
    }
  }, [onBackgroundChange])

  const handleSelectBackground = (bgId) => {
    setCurrentBg(bgId)
    localStorage.setItem('selectedBackground', bgId.toString())
    onBackgroundChange?.(bgId)
    setShowPicker(false)
  }

  const buttonClassName = inline ? 'bg-switcher-btn bg-switcher-btn--inline' : 'bg-switcher-btn'
  const pickerClassName = inline ? 'bg-picker bg-picker--inline' : 'bg-picker'
  const shouldShowPicker = inline || showPicker

  return (
    <div className={inline ? 'bg-switcher bg-switcher--inline' : 'bg-switcher'}>
      {!inline && (
        <button
          className={buttonClassName}
          onClick={() => setShowPicker(!showPicker)}
          aria-label="Выбрать фон"
          title="Выбрать фон"
        >
          🎨
        </button>
      )}

      {inline && (
        <button
          className={buttonClassName}
          onClick={() => setShowPicker(!showPicker)}
          aria-label="Сменить обои"
          title="Сменить обои"
        >
          🎨<span className="bg-switcher__label">Сменить обои</span>
        </button>
      )}

      {shouldShowPicker && (
        <div className={pickerClassName}>
          <div className="bg-picker__header">
            <h4 className="bg-picker__title">Выбери фон</h4>
            {!inline && (
              <button
                className="bg-picker__close"
                onClick={() => setShowPicker(false)}
                aria-label="Закрыть"
              >
                ✕
              </button>
            )}
          </div>

          <div className="bg-picker__grid">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                className={`bg-picker__option ${currentBg === bg.id ? 'bg-picker__option--active' : ''}`}
                onClick={() => handleSelectBackground(bg.id)}
                aria-label={bg.name}
                title={bg.name}
              >
                <div
                  className="bg-picker__preview"
                  style={{
                    backgroundImage: `url(/lucky/background${bg.id}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <span className="bg-picker__label">{bg.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
