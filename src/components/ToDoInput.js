import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../context/GlobalState';


const ToDoInput = () => {
    const { addTask } = useContext(GlobalContext);

    const [task, setTask] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [succeedMsg, setSucceedMsg] = useState(false);
    
    function onSubmit(e) {
        e.preventDefault();

        if(task === '') {
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return
        }

        const newTask = {
            id: Math.floor(Math.random() * 10000000),
            task: task,
            isCompleted: false
        }
        addTask(newTask);

        setTask(''); // Clear the input field
        setSucceedMsg(true);
        
        setTimeout(() => {
            setSucceedMsg(false);
        }, 3000);

        setShowAlert(false);
    }
    return(
    <div className='w-64 mx-auto'>
        <h1 className='text-center text-4xl mt-4 mb-5'>To Do App</h1>
        <form className="flex items-center gap-2" onSubmit={onSubmit}>
            <input
            name="todoitem"
            placeholder="Add a task" onChange={(e) => setTask(e.target.value)}
            value={task}
            className="flex-grow px-4 py-2 border border-gray-700 rounded-md focus:outline-none w-3/4 sm:w-2/3 lg:w-1/3"
            />
            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                <FaPlus />
            </button>
        </form>
       {showAlert &&
        <div
        className="bg-red-100 border border-red-400 text-red-700 w-56 mx-auto mt-4 px-4 py-3 rounded relative mb-4"
        role="alert"
        >
            <span className="block sm:inline">Task cannot be empty!</span>
        </div>
       }
       { succeedMsg && 
            <div className="bg-green-100 border border-green-400 mt-4 text-green-700 px-4 py-3 rounded relative w-56 mx-auto" role="alert">
                <span className="block sm:inline">New Task Added.</span>
            </div>
        }
    </div>
)};

export default ToDoInput;
