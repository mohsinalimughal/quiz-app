import { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [data , setdata] = useState([])
  const [ques , setques] = useState("")
  const [quesnum , setquesnum] = useState(0)
  const [ans , setans] = useState([])
  const [score , setscore] = useState(0)
  
  
  const getdata = async ()=>{
    try{
      const responce = await  fetch('https://the-trivia-api.com/v2/questions')
      const data = await responce.json()
      setdata(data)
      console.log(data[0])
      console.log(data[0].question.text)
      setques(data[quesnum].question.text)
      setans([data[quesnum].correctAnswer, ...data[quesnum].incorrectAnswers])    
      console.log(ans)
    }
    catch{
      console.log('errr')
    } 
}

const answerclicked = (item)=>{
  if(item === data[quesnum].correctAnswer){
    changeques()
    setscore(score + 1)
  }
  else{
    changeques()
  }
}


const changeques = (()=>{
  setquesnum(quesnum + 1)
  setques(data[quesnum].question.text)
  setans([data[quesnum].correctAnswer, ...data[quesnum].incorrectAnswers])  

})

  useEffect(()=>{
    getdata()



  },[])

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">Trivia Quiz</h1>
      <div className="quiz-question">{ques}</div>
      
      <div className="options-container">
        {ans.map((item) => (
          
  <>
  <label htmlFor="">
  <input type="radio" id="html" name="fav_language" value="HTML"></input>{item}</label>
  </>
          
        ))}
      </div>
      
      <button 
        className="next-button"
        onClick={changeques}
      >
        Next Question
      </button>
    </div>
  );
}

export default App
