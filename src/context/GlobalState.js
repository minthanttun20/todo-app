import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';


const initialState = {
    tasks: [
        {id: 1, task: 'To Buy Flowers', isCompleted: false, isImportant: true}, 
        {id: 2, task: 'To Go Gym', isCompleted: true, isImportant: false},
        {id: 3, task: 'Go Get water', isCompleted: false, isImportant: false}
    ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function deleteTask( id ) {
        dispatch({
            type: 'DELETE_TASK',
            payload: id
        })
    }

    function markAsImportant(id) {
        dispatch({
            type: 'IMPORTANT',
            payload: id
        })
    }

    function toggleTask(id) {
        dispatch({
            type: 'TOGGLE_TASK',
            payload: id
        })
    }

    function addTask( task ) {
        dispatch({
            type: 'ADD_TASK',
            payload: task
        })
    }

    return (
        <GlobalContext.Provider value= {{
            tasks:state.tasks, 
            addTask, deleteTask, toggleTask, markAsImportant
        }}>
            {children}
        </GlobalContext.Provider>
    )
}