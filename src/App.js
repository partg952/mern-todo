
import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import FlipMove from 'react-flip-move';
function App() {
  const [data,setData] = useState([])
  const [value,setValue] = useState(0)
  console.log(value)
  console.log(data)
  useEffect(()=>{
    axios('https://task-api-231.herokuapp.com').then((res)=>{
      console.log(res.data)
      
      setData(res.data)
     
    })
  },[value])
  return (
    <div className="App">
      <input type="text" onKeyPress={(e)=>{
        if(e.key === 'Enter'){
          console.log('clicked')
          axios('https://task-api-231.herokuapp.com/add-task?name='+e.target.value).then(()=>{
          var rand = Math.random()*7689558  
          console.log('saved')
            setValue(rand)
          })
        }
      }}/>
      <FlipMove>

      {
        data.map((items)=>{
          return(
            <div  key={items._id} className='flex'>
              <p> {items.task} </p>
              <button onClick={()=>{
                axios('https://task-api-231.herokuapp.com/delete-task?task='+items.task).then(()=>{
                  setValue(value+1)
                  console.log('clicked')
                })
              }}>Delete</button>
            </div>
            
            )
          })
        }
        </FlipMove>
    </div>
  );
}

export default App;
