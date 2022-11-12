import React from 'react'
import {useReducer,useEffect, useRef, useState} from 'react'
import './Task.css'

const initialState = {
  taskID:0,
  task_name:"",
  timerOn:false,
  status:"pending",
  priority:"na",
  timeStamp:0,
  time:0
}

export default function Task(props){

  const [state, dispatch] = useReducer(reducer, initialState)
  state.taskID = props.ID
  const timerID = useRef(0)

  useEffect(()=>{
    if (!state.timerOn) {
      return;
    }
    timerID.current = setInterval(()=>{
      dispatch({ type: "setTime" });
      console.log(state.time);
      }, 1000);

    return ()=>{
      console.log(state)
      clearInterval(timerID.current);
      timerID.current=0;
    };
  },[state.timerOn])

  const sendPost = (event) => {
    
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          task_event_id: 0,
          task_id: state.taskID,
          task_name: state.task_name,
          task_status: state.status,
          task_priority: state.priority,
          timeStamp: state.timeStamp,
          task_active: state.timerOn,
         })
    };
    
    fetch('http://localhost:8000/log_task', requestOptions)
    .then(response => console.log(response))
 
    }



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
        <div className="submit">
          <button onClick={(event)=>sendPost(event)}>submit</button>
        </div>

        <div className="time_disp">
        <div className="task_field">
          <label>{secondsToTime(state.time).h}h</label>
        </div>
        <div className="task_field">
          <label>{secondsToTime(state.time).m}m</label>
        </div>
        <div className="task_field">
          <label>{secondsToTime(state.time).s}s</label>
        </div>
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
    case "setTime":
      return{...state, time: state.time + 1 }
  }
}

function secondsToTime(secs)
{
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

