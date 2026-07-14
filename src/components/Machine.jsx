import { useRef } from 'react'
import Coin from './Coin.jsx'
import Gumball from './Gumball.jsx'
import machineImg from '../assets/sprites/machine.png'
import './Machine.css'

export default function Machine({ phase, prediction, onCoinInsert }) {
  const slotRef = useRef(null)

  return (
    <div className="machine">
      <div className="machine__body">
        <img src={machineImg} alt="" className="machine__sprite" draggable={false} />

        <Gumball phase={phase} predictionId={prediction?.id} />

        {/* Невидимая зона над уже нарисованной на спрайте прорезью —
            используется только для определения "попала ли монетка сюда",
            своей картинки не показывает, потому что прорезь уже часть
            артворка machine.png */}
        <div ref={slotRef} className="machine__slot-hitbox" aria-label="Прорезь для монетки" />

        {phase === 'idle' && (
          <Coin slotRef={slotRef} onInsert={onCoinInsert} disabled={phase !== 'idle'} />
        )}
      </div>
    </div>
  )
}
