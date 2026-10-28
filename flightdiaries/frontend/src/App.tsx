import { useEffect, useState } from 'react'
import diaryService from './services/diaries'
import { type NonSensitiveDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm'
function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]); 

  useEffect(() => {
    diaryService.getAll().then(data => {
      if (data) {
        setDiaryEntries(data)
      }
    }
    ).catch()
  }, [])

  const addDiaryEntry = (diaryEntry : NonSensitiveDiaryEntry) => {
    setDiaryEntries(diaryEntries.concat(diaryEntry))
  }
  return (
    <>
      <DiaryForm addDiaryEntry={addDiaryEntry}/>
      <DiaryList diaries={diaryEntries}/>
    </>
  )
}

export default App
