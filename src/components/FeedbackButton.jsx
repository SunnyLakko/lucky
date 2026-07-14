import { useState } from 'react'
import './FeedbackButton.css'

// -----------------------------------------------------------------------
// ВАЖНО: чтобы сообщения от посетителей реально доходили до тебя,
// замени этот email на свой настоящий (или собери ссылку под Telegram,
// см. подсказку ниже).
// -----------------------------------------------------------------------
const FEEDBACK_EMAIL = 'elokuva.sakki@gmail.com'

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  const mailtoHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
    'Отзыв о Gumball Machine'
  )}&body=${encodeURIComponent(text)}`

  return (
    <>
      <button
        className="feedback-btn"
        onClick={() => setOpen(true)}
        aria-label="Оставить отзыв"
      >
        ✉
      </button>

      {open && (
        <div className="feedback-overlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="feedback-card" onClick={(e) => e.stopPropagation()}>
            <p className="feedback-card__title">Оставить отзыв</p>
            <textarea
              className="feedback-card__textarea"
              placeholder="Что понравилось, что сломалось, чего не хватает..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
            <a
              className="feedback-card__send"
              href={mailtoHref}
              onClick={() => setOpen(false)}
            >
              Отправить на почту
            </a>
            <button className="feedback-card__close" onClick={() => setOpen(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}
