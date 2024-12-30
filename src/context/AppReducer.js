export default (state, action) => {
    switch(action.type) {
        case 'DELETE_TASK':
            return {
                ...state, 
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case 'ADD_TASK':
            return {
                ...state, 
                tasks: [action.payload, ...state.tasks]
            }
        case 'IMPORTANT':
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task.id === action.payload ? {...task, isImportant: !task.isImportant} : task
                )
            }
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
                    )
            };
        default: 
            return state;
    }
}