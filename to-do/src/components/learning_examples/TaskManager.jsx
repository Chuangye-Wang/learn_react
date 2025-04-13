import React, { useState } from "react";

function RenderTitleInput({task, handleFunc}) {
    return (
        <input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleFunc}
        />
    )
}

function RenderDescriptionInput({task, handleFunc}) {
    return (
        <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleFunc}
            style={{marginTop: "10px", width: "300px", height: "80px"}}
        />
    )
}

function RenderAssigneeInput({task, handleFunc}) {
    return (
        <input
            type="text"
            name="assignee"
            placeholder="Assignee"
            value={task.assignee}
            onChange={handleFunc}
        />
    )
}

function RenderDueDateInput({task, handleFunc}) {
    return (
        <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleFunc}
        />
    )
}

function RenderLabelInput({task, handleFunc}) {
    return (
        <input
            type="text"
            name="labels"
            placeholder="Labels (comma-separated)"
            value={task.labels}
            onChange={handleFunc}
        />
    )
}


function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        labels: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState(null);

    // Handle input change for new task
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    // Add Task
    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.description.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask({
                title: "",
                description: "",
                assignee: "",
                dueDate: "",
                labels: "",
            });
        }
    };

    // Delete Task
    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Enable Edit Mode
    const handleEditTask = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index]);
    };

    // Handle input change for editing task
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditTask({ ...editTask, [name]: value });
    };

    // Save Edited Task
    const handleSaveTask = () => {
        const updatedTasks = tasks.map((task, i) =>
            i === editIndex ? editTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Task Manager</h1>

            {/* Add Task Form */}
            <div style={{ marginBottom: "20px" }}>
                <h2>Create New Task</h2>
                <RenderTitleInput
                    task={newTask} handleFunc={handleInputChange}
                />
                <br />
                <RenderDescriptionInput
                    task={newTask} handleFunc={handleInputChange}
                />
                <br />
                <RenderAssigneeInput
                    task={newTask} handleFunc={handleInputChange}
                />
                <br />
                <RenderDueDateInput
                    task={newTask} handleFunc={handleInputChange}
                />
                <br />
                <RenderLabelInput
                    task={newTask} handleFunc={handleInputChange}
                />
                <br />
                <button onClick={handleAddTask} style={{ marginTop: "10px" }}>
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <h2>Task List</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ marginBottom: "20px" }}>
                        {editIndex === index ? (
                            <>
                                <RenderTitleInput
                                    task={editTask} handleFunc={handleEditInputChange}
                                />
                                <br />
                                <RenderDescriptionInput
                                    task={editTask} handleFunc={handleEditInputChange}
                                />
                                <br />
                                <RenderAssigneeInput
                                    task={editTask} handleFunc={handleEditInputChange}
                                />
                                <br />
                                <RenderDueDateInput
                                    task={editTask} handleFunc={handleEditInputChange}
                                />
                                <br />
                                <RenderLabelInput
                                    task={editTask} handleFunc={handleEditInputChange}
                                />
                                <br />
                                <button onClick={handleSaveTask} style={{ marginTop: "10px" }}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>Title:</strong> {task.title}
                                <br />
                                <strong>Description:</strong> {task.description}
                                <br />
                                <strong>Assignee:</strong> {task.assignee}
                                <br />
                                <strong>Due Date:</strong> {task.dueDate}
                                <br />
                                <strong>Labels:</strong> {task.labels}
                                <br />
                                <button
                                    onClick={() => handleEditTask(index)}
                                    style={{ marginTop: "10px", marginRight: "10px" }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;