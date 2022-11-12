import React from 'react'
import {useState,  useRef} from 'react'
import Task from './Task'
import './App.css'

const App = () => {
  const [taskArray, setTaskArray] = useState([])
  const [taskID, setTaskID] = useState(1)

  
  const createTaskHandler = ()=>{
    setTaskArray(ta => [...ta, <Task ID={taskID} key={taskID}/>])
    setTaskID(tid => tid + 1)
  }
  
  return (
    <div className="app">
      <div className="ctrls">
      <button className="button" onClick={()=>{createTaskHandler()}}>create task</button>
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