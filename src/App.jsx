import { useState, useEffect } from 'react';  
import Navbar from './components/Navbar';  
import { FaEdit } from "react-icons/fa";  
import { AiFillDelete } from "react-icons/ai";  
import { v4 as uuidv4 } from 'uuid';  

function App() {   
  // State variables for managing todos  
  const [todo, setTodo] = useState(""); // Current todo input  
  const [todos, setTodos] = useState([]); // List of todos  
  const [showFinished, setShowFinished] = useState(true); // Flag to show/hide completed todos  

  // Load todos from localStorage when the app first loads  
  useEffect(() => {  
    const todoString = localStorage.getItem("todos");  
    if (todoString) {  
      const todos = JSON.parse(todoString);  
      setTodos(todos); // Set todos state based on local storage  
    }  
  }, []);  
  
  // Save current todos to localStorage  
  const saveToLS = () => {  
    localStorage.setItem("todos", JSON.stringify(todos));  
  };  

  // Toggle the state to show or hide finished todos  
  const toggleFinished = () => {  
    setShowFinished(!showFinished);  
  };  

  // Handle editing a todo  
  const handleEdit = (e, id) => {   
    const todoToEdit = todos.find(item => item.id === id); // Find the todo to edit  
    setTodo(todoToEdit.todo); // Set the current input to the todo's text  
    const newTodos = todos.filter(item => item.id !== id); // Remove the editing todo  
    setTodos(newTodos); // Update todos state  
    saveToLS(); // Save changes to local storage  
  };  

  // Handle deleting a todo  
  const handleDelete = (e, id) => {  
    const newTodos = todos.filter(item => item.id !== id); // Remove the todo by id  
    setTodos(newTodos); // Update todos state  
    saveToLS(); // Save changes to local storage  
  };  

  // Handle adding a new todo  
  const handleAdd = () => {  
    if (todo.length > 3) { // Ensure the input length is valid  
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // Add new todo with a unique id  
      setTodo(""); // Clear the input field  
      saveToLS(); // Save changes to local storage  
    }  
  };  
  
  // Update the input field value  
  const handleChange = (e) => {   
    setTodo(e.target.value); // Set todo value based on input change  
  };  

  // Toggle the completion state of a todo  
  const handleCheckbox = (e) => {   
    const id = e.target.name;  
    const index = todos.findIndex(item => item.id === id); // Find index of the todo  
    const newTodos = [...todos]; // Create a new todos array  
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle isCompleted  
    setTodos(newTodos); // Update todos state  
    saveToLS(); // Save changes to local storage  
  };  
  
  return (  
    <>  
      <Navbar />   
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">  
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos in one place</h1>  
        <div className="addTodo my-5 flex flex-col gap-4">  
          <h2 className='text-2xl font-bold'>Add a Todo</h2>  
          <div className="flex">  
            <input   
              onChange={handleChange}   
              value={todo}   
              type="text"   
              className='w-full rounded-full px-5 py-1'   
            />  
            <button   
              onClick={handleAdd}   
              disabled={todo.length <= 3}   
              className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'  
            >  
              Save  
            </button>  
          </div>  
        </div>  

        <input   
          className='my-4'   
          id='show'   
          onChange={toggleFinished}   
          type="checkbox"   
          checked={showFinished}   
        />   
        <label className='mx-2' htmlFor="show">Show Finished</label>   

        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>  
        
        <h2 className='text-2xl font-bold'>Your Todos</h2>  
        <div className="todos">  
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}  
          {todos.map(item => {  
            return (showFinished || !item.isCompleted) && (  
              <div key={item.id} className={"todo flex my-3 justify-between"}>  
                <div className='flex gap-5'>   
                  <input   
                    name={item.id}   
                    onChange={handleCheckbox}   
                    type="checkbox"   
                    checked={item.isCompleted}   
                  />  
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>  
                </div>  
                <div className="buttons flex h-full">  
                  <button   
                    onClick={(e) => handleEdit(e, item.id)}   
                    className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'  
                  >  
                    <FaEdit />  
                  </button>  
                  <button   
                    onClick={(e) => handleDelete(e, item.id)}   
                    className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'  
                  >  
                    <AiFillDelete />  
                  </button>  
                </div>   
              </div>  
            );  
          })}  
        </div>  
      </div>  
    </>  
  );  
}  

export default App;