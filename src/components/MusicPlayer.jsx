import { useMusicPlayer } from '../hooks/useMusicPlayer.js'
import tracks from '../data/tracks.data.js'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const { audioRef, currentTrack, isPlaying, toggle, next, prev, hasMultipleTracks } =
    useMusicPlayer(tracks)

  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentTrack.src} loop preload="none" />

      {hasMultipleTracks && (
        <button
          className="music-player__btn music-player__btn--nav"
          onClick={prev}
          aria-label="Предыдущий трек"
        >
          ◀
        </button>
      )}

      <button
        className="music-player__btn music-player__btn--main"
        onClick={toggle}
        aria-label={isPlaying ? 'Поставить на паузу' : 'Включить музыку'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      {hasMultipleTracks && (
        <button
          className="music-player__btn music-player__btn--nav"
          onClick={next}
          aria-label="Следующий трек"
        >
          ▶
        </button>
      )}

      <span className="music-player__title">{currentTrack.title}</span>
    </div>
  )
}
