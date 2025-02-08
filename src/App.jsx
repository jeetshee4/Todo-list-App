import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {

   //Now we will make an todo as a state(somthing like a variable) and initiate it
   const [todo, setTodo] = useState("")
   //Also we will intiatet the todos list to initiate the todo list.This todos is the todo list basically holding each todo.
   const [todos, setTodos] = useState([])

   useEffect(() => {
      let todoString = localStorage.getItem("todos")
      if (todoString) {
         let todos = JSON.parse(localStorage.getItem("todos"))
         setTodos(todos)

      }
   }, [])

     const saveToLS =  (todos) => {
     localStorage.setItem("todos", JSON.stringify(todos))
    }





   
   



   const handleAdd =  () => {
      // This is the Syntax to add some new object into the todo list [...todos , {new object}] means that the existing objects will remain as it is and additionally a new todo object will be pushed to that array
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("") //This means that the setTodo is again blank
      // console.log([...todos, { id: uuidv4(), todo, isCompleted: false }])
       saveToLS(newTodos)
   }



   // Function to handle the edit functionality when the edit button is clicked 
   const handleEdit = (e, id) => {
      let t = todos.filter(i => i.id === id)
      setTodo(t[0].todo)

      //And we will delete the existing todo from the todos list
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      
      saveToLS(newTodos)
   }

   // Function to handle the delete functionality when the edit button is clicked
   const handleDelete = (e, id) => {
      console.log(`The id is:${id}`)

      let index = todos.findIndex(index => {
         return index.id === id;
      })
      console.log(todos)
      // It is like a comparator function with taked the comaparator function and according to the result value it finds the indices for which the id is same
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      
      saveToLS(newTodos)
   }

   const handleChange = (e) => {
      setTodo(e.target.value)
   }

   const handleCheckbox = (e) => {
      let id = e.target.name;
      let index = todos.findIndex(index => {
         return index.id === id;
      })

      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      
      saveToLS(newTodos)

   }

   return (
      <>
         <Navbar />
         <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
         <div className="container mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh]">
            <div className="addTodo" value={todo.isCompleted}>
               <h2 className='text-lg font-bold'>
                  Add a Todo
               </h2>
               <input onChange={handleChange} value={todo} className='bg-white py-1 px-3 w-80 rounded-lg border-black border-2' type="text" />
               <button onClick={handleAdd} className='hover:bg-violet-950 hover:cursor-pointer bg-violet-800 mx-6 rounded-md py-1 px-3 text-white'>Save</button>
            </div>

            <h2 className='text-xl font-bold'>Your Todos</h2>
            <div className="todos">
               <div className='mx-5 my-3'>
                  {todos.length === 0 && <div>No todos to display</div>}

               </div>
               {todos.map((item) => {

                  return <div key={item.id} className="todo flex justify-between w-1/4 my-2">
                     <div className="flex gap-5">
                        <input value={item.isCompleted} name={item.id} onChange={handleCheckbox} type="checkbox" />
                        <div className={item.isCompleted ? "line-through" : ""}>
                           {item.todo}
                        </div>
                     </div>
                     <div className="buttons flex gap-1 items-center mx-2">
                        <button onClick={(e) => { handleEdit(e, item.id) }} className='hover:bg-violet-950 flex items-center border-amber-50 border-2 hover:cursor-pointer edit bg-violet-800 text-white rounded-lg'><span className="material-symbols-outlined">
                           edit_square
                        </span></button>
                        <button onClick={(e) => { handleDelete(e, item.id) }} className='hover:bg-violet-950 flex items-center border-amber-50 border-2 hover:cursor-pointer delete bg-violet-800 text-white rounded-lg'><span className="material-symbols-outlined">
                           delete
                        </span></button>
                     </div>
                  </div>
               })}
            </div>
         </div>
      </>
   )
}

export default App
