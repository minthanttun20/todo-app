import React, { useState, useContext, useEffect } from 'react'
import Task from './Task'
import { GlobalContext } from '../context/GlobalState'
import Menu from './Menu';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


const ToDoList = () => {
  // const { tasks } = useContext(GlobalContext);
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(
            collection(db, 'Tasks'),
            where('userId', '==', user.uid)
          );

          const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTasks(tasksData);
        } else {
          console.error('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
      }
    };
    fetchTasks();
  }, [tasks]); 

  if(loading) {
    return <p className='mt-7 text-center text-2xl'>Loading Tasks...</p>
  }

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true; // Show all tasks
    if (filter === 'completed') return task.isCompleted; // Show only completed tasks
    if (filter === 'important') return task.isImportant; // Show only important tasks
    return false;
  });

  const msg = {
    all: 'No Tasks',
    completed: 'No Finished Tasks',
    important: 'No Important Tasks',
  };

  return (
    <>
      <ul>
        {tasks.length === 0 ? (
            <h1 className='text-center mt-7 text-4xl'>No Tasks</h1>
        ) : (
          <>
            <h3 className='text-center mt-5 text-3xl'>Your Tasks</h3>
            <hr className="border h-1 bg-gray-600 mt-4 w-40 mx-auto" />
            <Menu setFilter={setFilter}/>
            {filteredTasks.length === 0 ? (
              <h1 className="text-center mt-7 text-2xl">{msg[filter]}</h1>
            ) : (
              filteredTasks.map((task) => <Task key={task.id} task={task} />)
            )}
          </>
        ) }
      </ul>
    </>
    
  )
}

export default ToDoList