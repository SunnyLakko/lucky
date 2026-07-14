import predictions from '../data/predictions.data.js'

const STORAGE_KEY = 'gumball_last_prediction_id'

// Доступные цвета шариков (в порядке вероятности)
const GUMBALL_COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'purple', 'orange', 'cyan']

// Вероятность выпадения золотого шарика (1 из 50)
const GOLDEN_BALL_CHANCE = 0.02

// Счетчик "шансов" (попыток)
const CHANCES_STORAGE_KEY = 'gumball_total_chances'
const GUMBALLS_COUNTER_KEY = 'gumball_count'

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

function incrementChances() {
  try {
    const current = parseInt(localStorage.getItem(CHANCES_STORAGE_KEY) || '0', 10)
    localStorage.setItem(CHANCES_STORAGE_KEY, String(current + 1))
  } catch {
    /* no-op */
  }
}

function incrementGumballCount() {
  try {
    const current = parseInt(localStorage.getItem(GUMBALLS_COUNTER_KEY) || '0', 10)
    localStorage.setItem(GUMBALLS_COUNTER_KEY, String(current + 1))
  } catch {
    /* no-op */
  }
}

export function getTotalChances() {
  try {
    return parseInt(localStorage.getItem(CHANCES_STORAGE_KEY) || '0', 10)
  } catch {
    return 0
  }
}

export function getTotalGumballCount() {
  try {
    return parseInt(localStorage.getItem(GUMBALLS_COUNTER_KEY) || '0', 10)
  } catch {
    return 0
  }
}

let lastIdInMemory = readLastId()

/**
 * Выбирает случайный цвет для шарика
 */
function getRandomColor() {
  return GUMBALL_COLORS[Math.floor(Math.random() * GUMBALL_COLORS.length)]
}

/**
 * Возвращает случайное предсказание из массива, гарантированно НЕ
 * совпадающее по id с предыдущим показанным (если записей больше одной).
 * Также добавляет информацию о цвете и типе шарика.
 */
export function getRandomPrediction() {
  if (predictions.length === 0) return null
  if (predictions.length === 1) return enrichPrediction(predictions[0])

  let candidate = predictions[Math.floor(Math.random() * predictions.length)]

  // Пул большой (сотни записей), поэтому вероятность повтора на первой
  // попытке крайне мала; цикл — чисто защитный, максимум пара итераций.
  while (candidate.id === lastIdInMemory) {
    candidate = predictions[Math.floor(Math.random() * predictions.length)]
  }

  lastIdInMemory = candidate.id
  writeLastId(candidate.id)

  return enrichPrediction(candidate)
}

/**
 * Добавляет информацию о цвете и типе шарика к предсказанию
 */
function enrichPrediction(prediction) {
  incrementChances()
  incrementGumballCount()

  const isGolden = Math.random() < GOLDEN_BALL_CHANCE
  const color = isGolden ? 'gold' : getRandomColor()
  const type = isGolden ? 'golden' : 'regular'

  return {
    ...prediction,
    color,
    type,
    isGolden,
  }
}
