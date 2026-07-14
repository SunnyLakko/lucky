import { useState } from 'react'
import avatar from '../assets/author/avatar.jpg'
import './AuthorButton.css'

export default function AuthorButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="author-btn"
        onClick={() => setOpen(true)}
        aria-label="Об авторе"
      >
        ?
      </button>

      {open && (
        <div className="author-overlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="author-card" onClick={(e) => e.stopPropagation()}>
            <img src={avatar} alt="Аватар автора" className="author-card__avatar" />
            <p className="author-card__nick">sunlakko</p>
            <p className="author-card__desc">люблю цветочки и майнкрафт</p>
            <button className="author-card__close" onClick={() => setOpen(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}
