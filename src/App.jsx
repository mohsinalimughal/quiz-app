import { useEffect, useState } from 'react'


function App() {
  const [data , setdata] = useState([])
  const [ques , setques] = useState("")
  const [quesnum , setquesnum] = useState(0)
  const [ans , setans] = useState([])
  
  
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
    alert('correct')
    changeques()
  }
  else{
    alert('wrong')
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
    <>
<h1>{ques}</h1>
{

ans.map((item)=>{
return <><button onClick={()=>{
  answerclicked(item)
}} >{item}</button></>
})


}
<br/>
<button onClick={changeques}>next</button>



    </>
  )
}

export default App
