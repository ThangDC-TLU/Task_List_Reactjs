
import './Task.css'

function Task({ task, index, onOpenConfirmDelete, onOpenEditTask}) {
    

    return (
        <div className='task-list' key={index}>
            <div className='task-name'>
                <span>Task</span>
                <p className='task-column'>{task.tasks}</p>
            </div>

            <div className='priority'>
                <span>Priority</span>
                <p 
                    className='task-column' 
                    style={{
                        color: task.colorPriority
                    }}
                >{task.priority}</p>
            </div>

            <div className='status'>
                <button>{task.status}</button>
            </div>

            <div className='task_function'>
                <button 
                    className='edit'
                    onClick={() => onOpenEditTask()}
                >
                    <i className='fas fa-pen-to-square'/>
                </button>
                
                <button 
                    className='delete'
                    onClick={() => onOpenConfirmDelete()}
                >
                    <i className='fas fa-trash-alt'/>
                </button>
            </div>
        </div>
    );
}

export default Task;
