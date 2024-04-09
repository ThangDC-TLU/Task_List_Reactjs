import React, { useState } from 'react';
import Task from '../Element_Task/Task';
import Data from '../../Data/data.json';
import ActionTask from '../Action_Task/ActionTask';
import ConfirmDelete from '../Confirm_Delete/ConfirmDelete';
import './TaskLists.css';

function TaskLists() {
    //Điều khiển hoạt động mở và đóng thêm task
    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);
    //Điều khiển hoạt động mở và đóng xác nhận xóa task
    const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
    //Điều khiển hoạt động mở và đóng chỉnh sửa task
    const [isEditTaskVisible, setIsEditTaskVisible] = useState(false);
    //Lấy dữ liệu từ data.json
    const [tasks, setTasks] = useState(Data);
    //Lấy index của task đang thực hiện hoạt động xóa hoặc sửa
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    //Lấy dữ liệu task đang thực hiện hoạt động chỉnh sửa
    const [selectedEditTask, setSelectedEditTask] = useState({
        tasks: '',
        priority: '',
        status: '',
        colorPriority: ''
    });

    //Mở add task
    const handleAddTaskOpen = () => {
        setIsAddTaskVisible(true);
    };


    //Đóng add task
    const handleAddTaskClose = () => {
        setIsAddTaskVisible(false);
    };

    //Mở xác nhận xóa task
    const handleConfirmDeleteOpen = (index) => {
        setIsConfirmDeleteVisible(true);
        setSelectedTaskIndex(index);
    };

    //Đóng xác nhận xóa task
    const confirmCancel = () => {
        setIsConfirmDeleteVisible(false);
        setSelectedTaskIndex(null);
    };

    //mở chỉnh sửa task
    const handleEditTaskOpen = (task, index) => {
        setIsEditTaskVisible(true);
        setSelectedTaskIndex(index);
        setSelectedEditTask(task);
    };

    //Đóng chỉnh sửa task
    const handleEditTaskClose = () => {
        setIsEditTaskVisible(false);
        setSelectedTaskIndex(null);
    };

    //Thêm task mới
    const addTask = (newTask) => {
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        handleAddTaskClose();
    };

    //Xóa task
    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        setIsConfirmDeleteVisible(false);
    };

    //Chỉnh sửa task
    const editTask = (task, index) => {
        const newTasks = [...tasks];
        newTasks[index] = task;
        setTasks(newTasks);
        handleEditTaskClose();
    };

    return (
        <div className='container'>
            <div className='box'>
                <div className='header'>
                    <h2>Task List</h2>
                    <button className='btn-add-task' onClick={handleAddTaskOpen}>
                        <i className='fas fa-plus'/>
                        Add Task
                    </button>
                </div>

                <div>
                    {tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            index={index}
                            onOpenConfirmDelete={() => handleConfirmDeleteOpen(index)}
                            onOpenEditTask={() => handleEditTaskOpen(task, index)}
                        />
                    ))}
                </div>
            </div>

            {
                /* Nếu isAddTaskVisible === true thì add task sẽ được mở */
                isAddTaskVisible && 
                (<ActionTask 
                    title='AddTask' 
                    mode='add' 
                    onClose={handleAddTaskClose} 
                    addTask={addTask} 

                />
                )
            }

            {
                /* Nếu  isConfirmDeleteVisible === true thì xác nhận xóa sẽ được mở*/
                isConfirmDeleteVisible && (
                <ConfirmDelete confirmDelete={() => deleteTask(selectedTaskIndex)} confirmCancel={confirmCancel} />
            )}

            {
                /* Nếu isEditTaskVisible === true thì edit task sẽ được mở */
                isEditTaskVisible && (
                <ActionTask
                    title='Edit Task'
                    mode='edit'
                    onClose={handleEditTaskClose}
                    addTask={(task) => editTask(task, selectedTaskIndex)}
                    taskToEdit={selectedEditTask}
                />
            )}
        </div>
    );
}

export default TaskLists;
