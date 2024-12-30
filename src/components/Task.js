import React, { useContext, useState } from 'react'

import { FaTrash, FaCheck, FaFontAwesomeFlag } from "react-icons/fa";
import { GlobalContext } from '../context/GlobalState';
import { CiMenuKebab } from "react-icons/ci";

import Alert from './Alert';


const Task = ( {task} ) => {

  const { deleteTask, toggleTask, markAsImportant } = useContext(GlobalContext);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteTask = ( taskId ) => {
    deleteTask(taskId);
    setShowAlert(true);
    setAlertMessage("Task deleted successfully.")

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  const handleToggleTask = ( taskId ) => {
    toggleTask(taskId);
    setShowAlert(true);
    setAlertMessage(`${task.isCompleted ? "Task is not completed!" : "Task is completed"}`)

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  
  const openMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
      <>
       <li className={`group flex items-center justify-between py-2 px-4 my-4 border rounded-md shadow-md bg-gray-100 hover:bg-gray-200 w-80 mx-auto ${task.isCompleted ? 'opacity-50 line-through' : ''}`}>
          <span className="text-lg font-medium">{task.task}</span>
          <div className='flex items-center relative'>
            <CiMenuKebab 
                className='cursor-pointer' 
                onClick={() => openMenu()} 
              />
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-[-40px] flex items-center right-0 bg-white shadow-md border rounded-md py-2 px-4 z-10">
                <FaCheck 
                  className="text-green-500 cursor-pointer hover:text-green-600" 
                  onClick={() => handleToggleTask(task.id)} 
                />
                <FaTrash 
                  className="text-red-500 cursor-pointer hover:red-gray-600 ml-2" 
                  onClick={() => handleDeleteTask(task.id)} 
                />
                <FaFontAwesomeFlag className={ `ml-2 cursor-pointer ${task.isImportant ? 'text-yellow-400 hover:text-yellow-800': ''}` } onClick={() => markAsImportant(task.id)}/>
              </div>
            )}
          </div>
        </li>
        {showAlert && <Alert message={alertMessage} />}
      </>
  )
}

export default Task