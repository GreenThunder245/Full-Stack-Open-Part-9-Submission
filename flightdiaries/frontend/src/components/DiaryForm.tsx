import { useState } from 'react';
import { type Visibility, type Weather, type NewDiaryEntry, type NonSensitiveDiaryEntry} from '../types';
import diaryService from '../services/diaries'

const DiaryForm = ({addDiaryEntry}: {addDiaryEntry : (diaryEntry : NonSensitiveDiaryEntry) => void}) => {
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [date,setDate] = useState<string>('');
  const [comment,setComment] = useState<string>('');

  const [notification, setNotification] = useState<string | null>(null);

  const submit = async (event : React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary : NewDiaryEntry = {
      weather : weather,
      visibility : visibility,
      date :  date,
      comment : comment
    };
    try {
      const addedDiary = await diaryService.createNew(newDiary);
      addDiaryEntry(addedDiary)
      setDate('');
      setComment('');
    } catch (error) {
      if (error instanceof Error) {
        setNotification(error.message)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <div style={{ color: 'red' }}> {notification} </div>
      <form onSubmit={submit}>
        <div>
          Weather:
          <div>
            <label>
              <input
                type="radio"
                name="weather"
                onChange={() => setWeather('sunny')}
                defaultChecked
              />
              Sunny
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                onChange={() => setWeather('rainy')}
              />
              Rainy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                onChange={() => setWeather('cloudy')}
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                onChange={() => setWeather('stormy')}
              />
              Stormy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                onChange={() => setWeather('windy')}
              />
              Windy
            </label>
          </div>
        </div>
        <div>
          Visibility:
          <div>
            <label>
              <input
                type="radio"
                name="visibility"
                onChange={() => setVisibility('great')}
                defaultChecked
              />
              Great
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                onChange={() => setVisibility('good')}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                onChange={() => setVisibility('ok')}
              />
              Ok
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                onChange={() => setVisibility('poor')}
              />
              Poor
            </label>
          </div>
        </div>
        <div>
          <label>
            Date:
            <input
              type='date'
              value={date}
              onChange={(event) => setDate(event.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Comment: 
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)} 
            />
          </label>
        </div>
        <button type="submit">New Diary</button>
      </form>
    </div>
  )
}

export default DiaryForm