import { useRef, useState, useCallback } from 'react'
import coinImg from '../assets/sprites/coin.png'
import './Coin.css'

/**
 * Монетка, которую можно перетащить (мышь ИЛИ тач — Pointer Events
 * покрывают оба варианта одним и тем же кодом) в прорезь автомата.
 *
 * @param {React.RefObject} slotRef - ref на DOM-элемент прорези (drop-зона)
 * @param {() => void} onInsert - вызывается, когда монетка попадает в прорезь
 * @param {boolean} disabled - монетка неактивна (например, уже вставлена)
 */
export default function Coin({ slotRef, onInsert, disabled }) {
  const coinRef = useRef(null)
  const originRef = useRef({ x: 0, y: 0 })
  const [dragPos, setDragPos] = useState(null) // null = монетка на "исходной" позиции
  const [isDragging, setIsDragging] = useState(false)

  const checkOverlapWithSlot = useCallback((clientX, clientY) => {
    if (!slotRef.current) return false
    const rect = slotRef.current.getBoundingClientRect()
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    )
  }, [slotRef])

  const handlePointerDown = (e) => {
    if (disabled) return
    e.currentTarget.setPointerCapture(e.pointerId)
    originRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
    setDragPos({ dx: 0, dy: 0 })
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - originRef.current.x
    const dy = e.clientY - originRef.current.y
    setDragPos({ dx, dy })
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)

    const dropped = checkOverlapWithSlot(e.clientX, e.clientY)
    if (dropped) {
      onInsert()
    } else {
      // Не попали в прорезь — монетка плавно возвращается на место
      setDragPos(null)
    }
  }

  const style = dragPos
    ? {
        transform: `translate(${dragPos.dx}px, ${dragPos.dy}px)`,
        transition: isDragging ? 'none' : 'transform 0.25s ease-out',
      }
    : undefined

  if (disabled) return null

  return (
    <div className="coin-wrapper">
      <div
        ref={coinRef}
        className={`coin ${isDragging ? 'coin--dragging' : ''}`}
        style={style}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setIsDragging(false)
          setDragPos(null)
        }}
        role="button"
        aria-label="Перетащи монетку в прорезь автомата"
      >
        <img src={coinImg} alt="" className="coin__sprite" draggable={false} />
      </div>
      <p className="coin__hint">Перетащи монетку в прорезь</p>
    </div>
  )
}
