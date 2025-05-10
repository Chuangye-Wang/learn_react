import React, {useEffect, useState} from "react";
import "./TaskManager.css";
import axios from "axios"; // Import the CSS file

function RenderIDInput({task, handleFunc}) {
    return (
        <input
            type="number"
            name="id"
            placeholder="ID"
            value={task.id}
            onChange={handleFunc}
        />
    )
}


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
        <RenderIDInput task={task} handleFunc={handleFunc}/>
        <br/>
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
    useEffect(() => {
        axios.get("http://127.0.0.1:8000")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    const [newTask, setNewTask] = useState({
        id: "",
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
                axios
                    .put(`http://127.0.0.1:8000/task/${newTask.id}/`, newTask) // Replace with your Django API endpoint
                    .then((response) => {
                        // Update the task in edit mode
                        const updatedTasks = tasks.map(task =>
                            task.id === editIndex ? newTask : task
                        );
                        setTasks(updatedTasks);
                        setIsEditing(false); // Exit edit mode
                        setEditIndex(null); // Reset edit index
                    })
                    .catch((error) => {
                        console.error("Error adding task:", error);
                    });
            } else {
                // Add a new task if not editing
                axios
                    .post("http://127.0.0.1:8000", newTask) // Replace with your Django API endpoint
                    .then((response) => {
                        setTasks([...tasks, newTask]); // Add the new task to the local state
                    })
                    .catch((error) => {
                        console.error("Error adding task:", error);
                    });
                // setTasks([...tasks, newTask]);
            }

            // Clear the form
            setNewTask({
                id: "",
                title: "",
                description: "",
                assignee: "",
                dueDate: "",
                labels: "",
            });
        }
    };
    // Delete a task
    const handleDeleteTask = (taskId) => {
        axios.delete(`http://127.0.0.1:8000/task/${taskId}/`,
            // {
            //     withCredentials: true,
            //     headers: { 'X-CSRFToken': getCookie('csrftoken') },
        )
            .then(() => {
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                setTasks(updatedTasks);
            })
            .catch((error) => {
                console.error("Error deleting task:", error, `http://127.0.0.1:8000/task/${taskId}/`);
            });
    };

    // Edit a task
    const handleEditTask = (taskId) => {
        // find match id
        const taskToEdit = tasks.find((task) => task.id === taskId) || {
            id: "",
            title: "",
            description: "",
            assignee: "",
            dueDate: "",
            labels: "",
        };
        console.log(taskToEdit)
        setNewTask(taskToEdit); // Populate the form with the selected task
        setIsEditing(true); // Enable edit mode
        setEditIndex(taskId); // Track which task is being edited
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            {/*<h1>{tasks}</h1>*/}
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
                    <th>TASK ID</th>
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
                    tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.assignee}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.labels}</td>
                            <td>
                                <button
                                    onClick={() => handleEditTask(task.id)}
                                    className="action-button edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
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