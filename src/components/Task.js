import React, { useContext, useState } from 'react'

import { FaTrash, FaCheck, FaFontAwesomeFlag } from "react-icons/fa";
// import { GlobalContext } from '../context/GlobalState';
import { CiMenuKebab } from "react-icons/ci";

import Alert from './Alert';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';


const Task = ( {task} ) => {

  // const { deleteTask, toggleTask, markAsImportant } = useContext(GlobalContext);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteTask = async ( taskId ) => {
    try {
      await deleteDoc(doc(db, "Tasks", taskId));
      setShowAlert(true);
      setAlertMessage("Task deleted successfully.");
      setShowMenu(false); // Close the menu when user click the button

    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  const handleMarkAsCompleted = async ( taskId, isCompleted ) => {
    await updateDoc(doc(db, "Tasks", taskId), {isCompleted: !isCompleted})
    setShowAlert(true);
    setAlertMessage(`${task.isCompleted ? "Marked as not completed!" : "Task is completed"}`);
    setShowMenu(false); // Close the menu when user click the button

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }


  const handleMarkAsImportant = async ( taskId, isImportant ) => {
    await updateDoc(doc(db, "Tasks", taskId), {isImportant: !isImportant})
    
    setShowAlert(true);
    setAlertMessage(`${task.isCompleted ? "Marked as not important!" : "Marked as important"}`);
    setShowMenu(false); // Close the menu when user click the button

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  
  const openMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
      <>
       <li className="group flex flex-col items-start justify-around py-2 px-4 my-4 border rounded-md shadow-md bg-gray-100 hover:bg-gray-200 w-96 mx-auto">
          <div className='flex justify-between w-full'>
            <span className={`text-lg font-medium ${task.isCompleted ? 'opacity-50 line-through' : ''}`}>{task.task}</span>
            <div className='flex items-center relative justify-end'>
              <CiMenuKebab 
                  className='cursor-pointer' 
                  onClick={() => openMenu()} 
                />            
              
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute top-[-40px] flex items-center right-0 bg-white shadow-md border rounded-md py-2 px-4 z-10">
                  <FaCheck 
                    className="text-green-500 cursor-pointer hover:text-green-600" 
                    onClick={() => handleMarkAsCompleted(task.id, task.isCompleted)} 
                  />
                  <FaTrash 
                    className="text-red-500 cursor-pointer hover:red-gray-600 ml-2" 
                    onClick={() => handleDeleteTask(task.id)} 
                  />
                  <FaFontAwesomeFlag className={ `ml-2 cursor-pointer ${task.isImportant ? 'text-yellow-400 hover:text-yellow-800': ''}` } onClick={() => handleMarkAsImportant(task.id, task.isImportant)}/>
                </div>
              )}
            </div>
          </div>
          <span className='text-sm text-gray-500 mt-2'>{new Date(task.date).toLocaleString()}</span>
        </li>
        {showAlert && <Alert message={alertMessage} />}
      </>
  )
}

export default Task