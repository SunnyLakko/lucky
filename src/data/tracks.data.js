import newLook from '../assets/audio/Secret Potion, Lofi Beats To Chill Study Sleep - New Look (Wii U Mii Maker Lofi Mix).opus'
import fireIsGone from '../assets/audio/Heaven Pierce Her - The Fire Is Gone (For Music Box).opus'
import disgrace from '../assets/audio/Heaven Pierce Her - Disgrace. Humiliation.opus'
import silence from '../assets/audio/Heaven Pierce Her - Silence. Introspection.opus'

// -----------------------------------------------------------------------
// Как добавить свой трек:
// 1. Положи аудиофайл в src/assets/audio/.
// 2. Импортируй его сверху этого файла:
//      import myTrack from '../assets/audio/my-track.opus'
// 3. Добавь объект в массив ниже:
//      { title: 'Название трека', src: myTrack }
// Плеер сам подхватит новый трек, кнопки "вперёд/назад" появятся
// автоматически, как только треков в массиве станет больше одного.
// -----------------------------------------------------------------------

const tracks = [
  { title: 'Secret Potion, Lofi Beats To Chill Study Sleep - New Look (Wii U Mii Maker Lofi Mix).opus', src: newLook },
  { title: 'The Fire Is Gone (Music Box)', src: fireIsGone },
  { title: 'Disgrace. Humiliation', src: disgrace },
  { title: 'Silence. Introspection', src: silence },
]

export default tracks