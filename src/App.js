
import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const inputRef = useRef();
  
  const handleAddTodos = () => {
    const text = inputRef.current.value;
    if (text) {
      const newTodos = { completed: false, text };
      setTodos([...todos,newTodos]);
      inputRef.current.value = "";
    } else {
      alert("please add task!!")
    }  
  }

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    
    newTodos[index].completed = !newTodos[index].completed;
    if (newTodos[index].completed) {
      const text = newTodos[index].text;
      const completed = newTodos[index].completed;
      const newCompletedTask = { completed, text };
      setCompletedTask([...completedTask,newCompletedTask]);
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  
  }

  const handleCompletedItemDone = (index) => {
    const newCompletedTask = [...completedTask];
    newCompletedTask[index].completed = false;
    if (!newCompletedTask[index].completed) {
      const text = newCompletedTask[index].text;
      const completed = newCompletedTask[index].completed;
      const newTodos = { completed, text };
      setTodos([...todos, newTodos]);
       newCompletedTask.splice(index, 1);  
       setCompletedTask(newCompletedTask);
    }
    
  }

  const handleDeletedItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);  
  }

  const handleDeletedCompletedItem = (index) => {
    const newCompletedTask = [...completedTask];
    newCompletedTask.splice(index, 1);  
    setCompletedTask(newCompletedTask);
  }
  
  
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className='to-do-container'>
        {todos.length > 0 ? 
           <ul>
          {todos.map(({text,completed},index) => {
            return (
              <div key={index} className='item'>
                  <li
                  className={completed ? "done" : ""}
                  key={index}
                  onClick={() => handleItemDone(index)}>
                  {text}
                </li>
                <span className='trash' onClick={()=>handleDeletedItem(index)}>❌</span>
              </div>
            )
          }  
           )}
        </ul>
          : <p className='no-task'> There is no task !! </p>}
        
        {completedTask.length > 0 && 
          
          <div>
            <p className='completed'>Completed Task</p>
            <ul>
          {completedTask.map(({ text,completed }, index) => {
            return (
              <div key={index} className='item'>
                  <li
                  className={completed ? "done" : ""}
                  key={index}
                  onClick={()=>handleCompletedItemDone(index)}>
                  {text}
                </li>
                <span className='trash' onClick={()=>handleDeletedCompletedItem(index)}>❌</span>
              </div>
            )
          })}
        </ul> 
          </div>
        }
        
        <input ref={inputRef} type='text' placeholder='enter your task...' />
        <button onClick={handleAddTodos}>Add Task</button>
      </div>
      
      
    </div>
  );
}

export default App;
