import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Простой плеер плейлиста. Треки лежат в массиве `tracks`
 * (см. src/data/tracks.data.js) — чтобы добавить свою музыку,
 * достаточно дополнить этот массив, ничего в самом хуке менять не нужно.
 */
export function useMusicPlayer(tracks) {
  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentTrack = tracks[trackIndex]

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      // Браузер мог заблокировать автовоспроизведение без явного жеста
      // пользователя — просто остаёмся в состоянии "на паузе".
      setIsPlaying(false)
    })
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }, [isPlaying, play])

  const next = useCallback(() => {
    setTrackIndex((i) => (i + 1) % tracks.length)
  }, [tracks.length])

  const prev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  // При смене трека, если плеер уже играл — сразу продолжаем следующим
  useEffect(() => {
    if (isPlaying) {
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex])

  return {
    audioRef,
    currentTrack,
    isPlaying,
    toggle,
    next,
    prev,
    hasMultipleTracks: tracks.length > 1,
  }
}
