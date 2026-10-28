import { type NonSensitiveDiaryEntry } from '../types';

const DiaryList = ({ diaries } : {diaries : NonSensitiveDiaryEntry[]}) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </>
  )
}

export default DiaryList