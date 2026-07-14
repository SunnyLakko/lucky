import { useRef, useCallback } from 'react'

export function useAudioManager() {
  const clickAudioRef = useRef(null)
  const coinAudioRef = useRef(null)

  const playClickSound = useCallback(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0
      clickAudioRef.current.play().catch(() => {
        // Игнорируем ошибки воспроизведения (например, на мобильных устройствах)
      })
    }
  }, [])

  const playCoinSound = useCallback(() => {
    if (coinAudioRef.current) {
      coinAudioRef.current.currentTime = 0
      coinAudioRef.current.play().catch(() => {
        // Игнорируем ошибки воспроизведения
      })
    }
  }, [])

  return {
    clickAudioRef,
    coinAudioRef,
    playClickSound,
    playCoinSound,
  }
}
