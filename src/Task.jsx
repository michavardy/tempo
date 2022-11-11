import React from 'react'
import {useReducer,useEffect, useRef, useState} from 'react'
import './Task.css'

const initialState = {
  taskID:0,
  task_name:"",
  timerOn:false,
  status:"pending",
  priority:"na",
  timeStamp:null,
}

export default function Task(props){
  const [time,setTime] = useState(0)
  const [post,setPost] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState)
  state.taskID = props.ID
  const timerID = useRef(0)

  useEffect(()=>{
    if (!state.timerOn){return}
    timerID.current = setInterval(setTime(()=>{time+1}), 1000);
    return ()=>{
      clearInterval(timerID.current);
      timerID.current=0;
    };
  },[state.timerOn])

  //useEffect(() => {
  //  // POST request using fetch inside useEffect React hook
  //  const requestOptions = {
  //      method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //      body: JSON.stringify({ 
  //        task_event_id: 0,
  //        task_id: state.taskID,
  //        task_name: state.task_name,
  //        task_status: state.status,
  //        task_priority: state.priority,
  //        timeStamp: state.timeStamp,
  //        task_active: state.timerOn,
  //        time_recorded: time
  //       })
  //  };
  //  fetch('http://localhost:8000/', requestOptions)
  //  }, [post]);



  return (
    <div className="task_card">
        <div className="task_field">
            <label>task name</label>
            <input type="text" onBlur={(event)=>dispatch({type:"task_name", payload:event.target.value})} ></input>
        </div>
        <div className="task_field">
            <label>timer</label>
            <input type="checkbox" onChange={(event)=>dispatch({type:"timer", payload:event})}></input>
        </div>
        <div className="task_field">
            <label>status</label>
            <select className="status" id="status" onChange={(event)=>dispatch({type:"status", payload:event.target.value})}>
              <option value="complete">complete</option>
              <option value="started">started</option>
              <option value="frozen">frozen</option>
              <option value="pending">pending</option>
            </select>
        </div>
        <div className="task_field">
            <label>priority</label>
            <select className="priority" id="priority" onChange={(event)=>dispatch({type:"priority", payload:event.target.value})}>
              <option value="right-now">right-now</option>
              <option value="today">today</option>
              <option value="this-week">this-week</option>
              <option value="na">not applicable</option>
            </select>
        </div>
        <div className="task_field">
          <label>submit</label>
          <button onClick={setPost("click")}>submit</button>
        </div>

    </div>
  )
}

function reducer(state, action){

  switch(action.type){
    case "task_name":
      return {...state, task_name:action.payload}
    case "timer":
      return {...state, timerOn:action.payload.target.checked, timeStamp:action.payload.timeStamp}
    case "status":
      return{...state, status:action.payload}
    case "priority":
      return{...state, priority:action.payload}
  }
}

