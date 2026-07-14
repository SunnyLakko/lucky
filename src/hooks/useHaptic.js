/**
 * Безопасная обёртка над navigator.vibrate.
 * iOS Safari и десктопные браузеры без поддержки API просто не вызовут
 * функцию — проверка isSupported убирает риск исключений.
 */
export function useHaptic() {
  const isSupported =
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'

  const vibrate = (pattern) => {
    if (isSupported) {
      try {
        navigator.vibrate(pattern)
      } catch {
        /* некоторые браузеры кидают ошибку в неактивной вкладке — игнорируем */
      }
    }
  }

  return {
    isSupported,
    tick: () => vibrate(8), // короткий "тик" - при прокрутке ручки
    crank: () => vibrate(15), // чуть плотнее - шаг прокрутки
    thud: () => vibrate([10, 30, 60]), // сильный "удар" - падение шарика
    success: () => vibrate([0, 20, 40, 20]), // при открытии предсказания
  }
}
