import React from 'react'
import {useState,  useRef} from 'react'
import Task from './Task'
import './App.css'

const App = () => {
  const [taskArray, setTaskArray] = useState([])
  const [taskID, setTaskID] = useState(1)

  
  const createTaskHandler = ()=>{
    setTaskArray(taskArray.concat(<Task ID={taskID}/>));
    setTaskID(taskID + 1)
    console.log(taskArray);
  }
  
  return (
    <div className="app">
      <div className="ctrls">
      <button className="button" onClick={createTaskHandler}>create task</button>
      <select className="button" id="query">
              <option value="all">all</option>
              <option value="started">started</option>
              <option value="frozen">frozen</option>
              <option value="completed">completed</option>
      </select>
      </div>
      {taskArray}
    </div>
  )
}

export default App