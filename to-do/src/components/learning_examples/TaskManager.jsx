import React, { useState } from "react";
import "./TaskManager.css"; // Import the CSS file

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

function RenderAllInput({task, handleFunc}) {
    return (
        <>
        <RenderTitleInput task={task} handleFunc={handleFunc}/>
        <br/>
        <RenderDescriptionInput task={task} handleFunc={handleFunc}/>
        <br/>
        <RenderAssigneeInput task={task} handleFunc={handleFunc}/>
        <br/>
        <RenderDueDateInput task={task} handleFunc={handleFunc}/>
        <br/>
        <RenderLabelInput task={task} handleFunc={handleFunc}/>
        <br/>
        </>
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
    const [isEditing, setIsEditing] = useState(false); // To check if in edit mode
    const [editIndex, setEditIndex] = useState(null); // To track the task being edited

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    // Add a new task
    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.description.trim()) {
            if (isEditing) {
                // Update the task in edit mode
                const updatedTasks = tasks.map((task, index) =>
                    index === editIndex ? newTask : task
                );
                setTasks(updatedTasks);
                setIsEditing(false); // Exit edit mode
                setEditIndex(null); // Reset edit index
            } else {
                // Add a new task if not editing
                setTasks([...tasks, newTask]);
            }

            // Clear the form
            setNewTask({
                title: "",
                description: "",
                assignee: "",
                dueDate: "",
                labels: "",
            });
        }
    };

    // Delete a task
    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Edit a task
    const handleEditTask = (index) => {
        setNewTask(tasks[index]); // Populate the form with the selected task
        setIsEditing(true); // Enable edit mode
        setEditIndex(index); // Track which task is being edited
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>

            {/* Add Task Form */}
            <div className="task-form">
                <h2 className="add-edit-task">{isEditing ? "Edit Task" : "Add New Task"}</h2>
                <RenderAllInput task={newTask} handleFunc={handleInputChange}/>
                <button
                    onClick={handleAddTask}
                >
                    {isEditing ? "Save Task" : "Add Task"}
                </button>
            </div>

            {/* Task Table */}
            <h2>Task List</h2>
            <table
                border="1"
                className="task-table"
            >
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Assignee</th>
                    <th>Due Date</th>
                    <th>Labels</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.assignee}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.labels}</td>
                            <td>
                                <button
                                    onClick={() => handleEditTask(index)}
                                    className="action-button edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(index)}
                                    className="action-button delete"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                            No tasks available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TaskManager;