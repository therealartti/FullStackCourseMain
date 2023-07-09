import { useState, useEffect } from "react";
import axios, {AxiosError} from 'axios'
import { DiaryEntry, NewDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    { id: 1, date: 'test', weather: 'test', visibility: 'test' }
  ]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const radios = ["great", "good", "ok", "poor"]
  const radios2 = ["sunny", "rainy", "cloudy", "stormy", "windy"]

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
    .then(response => {
      console.log(response.data);
      setDiaries(response.data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      id: diaries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    axios.post<NewDiaryEntry>('http://localhost:3000/api/diaries', diaryToAdd )
      .then(response => {
        setDiaries(diaries.concat(response.data))
        setNewDate('')
      setNewWeather('')
      setNewVisibility('')
      setNewComment('')
      })
      .catch( e => {
      const error = e as AxiosError;
      console.log(error)
      setErrorMessage((error.response?.data || 'An error occurred.').toString())
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    })};

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={diaryCreation}>
        <div>date<input
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        /></div>

        <div> visibility {radios.map((option) => (
          <label key={option}>
            {option}
          <input
            type="radio"
            value={option}
            onChange={(event) => setNewVisibility(event.target.value)} 
          /> </label>))}</div>

        <div>weather{radios2.map((option) => (
          <label key={option}>
            {option}
          <input
            type="radio"
            value={option}
            onChange={(event) => setNewWeather(event.target.value)} 
          /> </label>))}</div>

        <div>comment<input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)} 
        /></div>
        <button type='submit'>add</button>
      </form>
      <h3>Diary entries</h3>
        {diaries.map(diary =>
          <div key={diary.id}>
            <h3>{diary.date}</h3>
             <div>visibility: {diary.visibility}</div>
             <div>weather: {diary.weather}</div></div>
        )}
    </div>
  )
}

export default App;