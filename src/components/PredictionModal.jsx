import './PredictionModal.css'

export default function PredictionModal({ prediction, onReset }) {
  if (!prediction) return null

  return (
    <div className="prediction-overlay" role="dialog" aria-modal="true">
      <div className="prediction-card">
        <div className="prediction-card__pin" />
        <p className="prediction-card__label">Твоё предсказание</p>
        <p className="prediction-card__text">{prediction.text}</p>
        <button className="prediction-card__button" onClick={onReset}>
          Ещё монетку!
        </button>
      </div>
    </div>
  )
}
