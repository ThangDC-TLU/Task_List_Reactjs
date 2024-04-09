import React, { useState, useEffect } from "react";
import './ActionTask.css'

function AddTask({ title, mode, onClose, addTask, taskToEdit }) {
    const [task, setTask] = useState({
        tasks: '',
        priority: '',
        status: '',
        colorPriority: ''
    });

    const [selectedPriority, setSelectedPriority] = useState(null);
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        if (mode === "edit" && taskToEdit) {
            setTask(taskToEdit);
            setSelectedPriority(taskToEdit.priority);
        }
    }, [mode, taskToEdit]);

    const handleButtonClick = (priority) => {
        setSelectedPriority(priority);
        setTask(prevTask => ({
            ...prevTask,
            priority: priority,
            colorPriority: getColorPriority(priority),
        }));
    };

    const getColorPriority = (priority) => {
        switch (priority) {
            case "High":
                return "red";
            case "Medium":
                return "gold";
            case "Low":
                return "green";
            default:
                return "";
        }
    };

    const validateTask = (task) => {
        return task.trim().length <= 30;
    };

    return (
        <div className='box2'>
            <div className='Add-Task'>
                <div className='add-task-header'>
                    <h3>{title}</h3>
                    <button
                        className='btn-exit'
                        onClick={onClose}
                    >
                        <i className='fas fa-xmark' />
                    </button>
                </div>

                <div className='add-task-input'>
                    <span className='add-task-input-title'>Task</span>
                    <input
                        type='text'
                        placeholder='Type your task here...'
                        value={task.tasks}
                        onChange={(e) => {
                            const isValid = validateTask(e.target.value);
                            setInputError(!isValid);
                            if (isValid) {
                                setTask(prevTask => ({
                                    ...prevTask,
                                    tasks: e.target.value
                                }));
                            }
                        }}
                    />
                    {inputError && <span className='errorMessage'>Task should be less than 30 characters</span>}
                </div>

                <div className='add-task-priority'>
                    <span>Priority</span>
                    <div className='select-priority'>
                        <button
                            className='high'
                            onClick={() => handleButtonClick("High")}
                            style={{
                                backgroundColor: selectedPriority === "High" ? "red" : "",
                                color: selectedPriority === "High" ? "white" : ""
                            }}
                        >
                            High
                        </button>
                        <button
                            className='medium'
                            onClick={() => handleButtonClick("Medium")}
                            style={{
                                backgroundColor: selectedPriority === "Medium" ? "gold" : "",
                                color: selectedPriority === "Medium" ? "white" : ""
                            }}
                        >
                            Medium
                        </button>
                        <button
                            className='low'
                            onClick={() => handleButtonClick("Low")}
                            style={{
                                backgroundColor: selectedPriority === "Low" ? "green" : "",
                                color: selectedPriority === "Low" ? "white" : ""
                            }}
                        >
                            Low
                        </button>
                    </div>
                </div>

                <div className='submit'>
                    <button
                        className='btn-submit'
                        onClick={() => addTask(task)}
                        disabled={!validateTask(task.tasks)}
                        style={{
                            backgroundColor: task.tasks.trim() && validateTask(task.tasks) ? "blue" : "#747272",
                            cursor: task.tasks.trim() && validateTask(task.tasks) ? "pointer" : "auto"
                        }}
                    >{mode === "add" ? "Add" : "Update"}</button>
                </div>

            </div>
        </div>
    )
}

export default AddTask;
