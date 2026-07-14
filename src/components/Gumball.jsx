import ballImg from '../assets/sprites/ball.png'
import './Gumball.css'

// Разные оттенки одного и того же пиксель-арт спрайта шарика через
// hue-rotate — приятная мелочь: конкретное предсказание всегда
// "выпадает" одним и тем же цветом шарика.
const HUE_STEPS = [0, 60, 130, 190, 260, 320]

export default function Gumball({ phase, predictionId }) {
  if (phase !== 'dispensing' && phase !== 'opened') return null

  const hue = predictionId
    ? HUE_STEPS[Math.abs(hashCode(String(predictionId))) % HUE_STEPS.length]
    : 0

  const isSettled = phase === 'opened'

  return (
    <div className={`gumball ${isSettled ? 'gumball--settled' : 'gumball--falling'}`}>
      <img
        src={ballImg}
        alt=""
        className="gumball__sprite"
        style={{ filter: `hue-rotate(${hue}deg)` }}
        draggable={false}
      />
    </div>
  )
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}
