import predictions from '../data/predictions.data.js'

const STORAGE_KEY = 'gumball_last_prediction_id'

function readLastId() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw === null ? null : Number(raw)
  } catch {
    // sessionStorage может быть недоступен (приватный режим и т.п.)
    return null
  }
}

function writeLastId(id) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(id))
  } catch {
    /* no-op */
  }
}

let lastIdInMemory = readLastId()

/**
 * Возвращает случайное предсказание из массива, гарантированно НЕ
 * совпадающее по id с предыдущим показанным (если записей больше одной).
 */
export function getRandomPrediction() {
  if (predictions.length === 0) return null
  if (predictions.length === 1) return predictions[0]

  let candidate = predictions[Math.floor(Math.random() * predictions.length)]

  // Пул большой (сотни записей), поэтому вероятность повтора на первой
  // попытке крайне мала; цикл — чисто защитный, максимум пара итераций.
  while (candidate.id === lastIdInMemory) {
    candidate = predictions[Math.floor(Math.random() * predictions.length)]
  }

  lastIdInMemory = candidate.id
  writeLastId(candidate.id)

  return candidate
}
