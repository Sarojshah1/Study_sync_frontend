import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  FaPlus,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const initialColumns = {
  backlog: { name: "Backlog", tasks: [] },
  todo: { name: "To Do", tasks: [] },
  doing: { name: "In Progress", tasks: [] },
  done: { name: "Done", tasks: [] },
};


const TasksPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(initialColumns);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee_id: "",
    priority: "Medium",
    deadline: "",
  });
  const [member, setMember] = useState({});
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchProjectById();
    if (id && token) {
      fetchTasks();
    }
  }, [id, token]);
  const fetchProjectById = async () => {
    try {
      setLoading(true);
      const response = await fetch(
          `http://localhost:3000/api/projects/projects/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

      if (!response.ok) throw new Error("Failed to fetch project details.");

      const data = await response.json();
      setMember(data.project.members || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
          `http://localhost:3000/api/task/project/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
        },
      }
    );

      if (!response.ok) throw new Error("Failed to fetch tasks.");

      const data = await response.json();
      const updatedColumns = { ...initialColumns };
      const statusMap = {
        Backlog: "backlog",
        "To Do": "todo",
        "In Progress": "doing",
        Done: "done",
      };

      data.forEach((task) => {
        const columnKey = statusMap[task.status];

        // Check if the columnKey is valid and if the task isn't already added
        if (columnKey) {
          const isTaskAlreadyInColumn = updatedColumns[columnKey].tasks.some(
              (existingTask) => existingTask._id === task._id
          );

          // Add task only if it's not already in the column
          if (!isTaskAlreadyInColumn) {
            updatedColumns[columnKey].tasks.push(task);
          }
        }
      });

      console.log(updatedColumns);


      setColumns(updatedColumns);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = active.data.current.droppableId;
    const destinationColumn = over.data.current.droppableId;

    // Ensure the active task exists
    const task = columns[sourceColumn]?.tasks.find((task) => task._id === active.id);

    // If the task is not found, exit early
    if (!task) {
      console.error("Task not found!");
      return;
    }

    // Prevent dragging completed tasks back to another column
    if (task?.completed && destinationColumn !== "done" && sourceColumn !== "done") {
      setErrorMessage("You can't move a completed task back to another column!");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    // Allow task to move to "done" if it's not already there
    if (destinationColumn === "done" && sourceColumn !== "done") {
      // task.completed = true; // Handle completed status logic if needed
    }

    if (sourceColumn !== destinationColumn) {
      // Remove the task from the source column
      const sourceTasks = [...columns[sourceColumn].tasks];
      const [movedTask] = sourceTasks.splice(active.index, 1);

      // Add the task to the destination column
      const destinationTasks = [...columns[destinationColumn].tasks];
      destinationTasks.splice(over.index, 0, movedTask);
      console.log(destinationColumn)
      let status = "";
      if (destinationColumn === "backlog") {
        status = "Backlog";
      } else if (destinationColumn === "todo") {
        status = "To Do";
      } else if (destinationColumn === "doing") {
        status = "In Progress";
      } else if (destinationColumn === "done") {
        status = "Done";
      }

      // Update the task's status through the API
      try {
        const response = await fetch(`http://localhost:3000/api/task/${task._id}/status`, {
        method: 'PATCH',
            headers: {
          'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Update the columns state with the new task position
      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumn]: { ...prevColumns[sourceColumn], tasks: sourceTasks },
        [destinationColumn]: {
          ...prevColumns[destinationColumn],
          tasks: destinationTasks,
        },
      }));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }
};



const addNewTask = () => {
  const newTaskWithId = {
    ...newTask,
    project_id: id,
  };
  const taskData = {
    ...newTaskWithId,
  };
  console.log(taskData);

  fetch("http://localhost:3000/api/task/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK (status code not 2xx), throw an error
          return response.text().then((text) => {
            throw new Error(`Request failed with status ${response.status}: ${text}`);
          });
        }
        return response.json(); // Only parse as JSON if the response is OK
      })
      .then((data) => {
        setColumns((prevColumns) => ({
          ...prevColumns,
          backlog: {
            ...prevColumns.backlog,
            tasks: [...prevColumns.backlog.tasks, data],
          },
        }));

        setNewTask({
          title: "",
          description: "",
          assignee_id: "",
          priority: "Medium",
          deadline: "",
        });
        setNewTaskModal(false);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
};

const handleTaskClick = (task) => {
  setSelectedTask(task);
};

return (
    <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">
          Task Management
        </h1>

        <button
            onClick={() => setNewTaskModal(true)}
            className="mb-6 px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-all duration-300"
        >
          <FaPlus className="inline-block mr-2" /> Add New Task
        </button>

        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={({ active }) => setActiveTask(active)}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(columns).map(([columnId, column]) => (
                <DroppableColumn
                    key={columnId}
                    columnId={columnId}
                    column={column}
                    handleTaskClick={handleTaskClick}
                />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
                <div className="bg-white p-6 rounded-lg shadow-lg w-60">
                  <h3 className="font-bold text-teal-800">
                    {
                      columns[activeTask.data.current.droppableId].tasks.find(
                          (task) => task._id === activeTask._id
                      )?.title
                    }
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <FaCalendarAlt className="inline-block mr-1" />
                    {
                      columns[activeTask.data.current.droppableId].tasks.find(
                          (task) => task._id === activeTask._id
                      )?.deadline
                    }
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <FaUser className="inline-block mr-1" />
                    {
                      columns[activeTask.data.current.droppableId].tasks.find(
                          (task) => task._id === activeTask._id
                      )?.assignee_id
                    }
                  </p>
                </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {errorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white p-4 rounded-md shadow-md">
            {errorMessage}
          </div>
      )}

      {newTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
              <button
                  onClick={() => setNewTaskModal(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-teal-600"
              >
                <FaTimesCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                Add New Task
              </h2>
              <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                    value={newTask.assignee_id}
                    onChange={(e) =>
                        setNewTask({ ...newTask, assignee_id: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Assign to</option>
                  {member.map((user) => (
                      <option key={user.user_id._id} value={user.user_id._id}>
                        {user.user_id.name}
                      </option>
                  ))}
                </select>
                <select
                    value={newTask.priority}
                    onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) =>
                        setNewTask({ ...newTask, deadline: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                  onClick={addNewTask}
                  className="mt-6 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300"
              >
                Add Task
              </button>
            </div>
          </div>
      )}

      {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
              <button
                  onClick={() => setSelectedTask(null)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-teal-600"
              >
                <FaTimesCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                {selectedTask.title}
              </h2>
              <p className="text-sm text-gray-600">
                <FaCalendarAlt className="inline-block mr-1" />
                {selectedTask.deadline}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <FaUser className="inline-block mr-1" />
                {selectedTask.assignee_id}
              </p>
              {selectedTask.completed && (
                  <div className="text-green-500 mt-2">
                    <FaCheckCircle className="inline-block mr-1" /> Completed
                  </div>
              )}
              <button
                  onClick={() => setSelectedTask(null)}
                  className="mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
      )}
    </div>
);
};

const DroppableColumn = ({ columnId, column, handleTaskClick }) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { droppableId: columnId },
  });

  return (
      <div ref={setNodeRef} className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold text-teal-800 mb-4">
          {column.name}
        </h2>
        <SortableContext
            items={column.tasks.map((task) => task._id)}
            strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 min-h-[200px]">
            {column.tasks.map((task, index) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    columnId={columnId}
                    index={index}
                    handleTaskClick={handleTaskClick}
                />
            ))}
          </div>
        </SortableContext>
      </div>
  );
};

const TaskCard = ({ task, columnId, index, handleTaskClick }) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: task._id,
    data: { droppableId: columnId },
  });

  return (
      <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={() => handleTaskClick(task)}
          className="bg-gradient-to-r from-teal-200 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105"
      >
        <h3 className="font-semibold text-teal-800 text-xl mb-2">{task.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{task.description}</p>

        <div className="flex items-center justify-between space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <FaCalendarAlt className="text-teal-600" />
            <span className="text-gray-800">{new Date(task.created_at).toLocaleDateString()}</span> {/* Start Date */}
            <span className="mx-2 text-gray-500">-</span>
            <span className="text-gray-800">{new Date(task.deadline).toLocaleDateString()}</span> {/* Deadline */}
          </div>

          <div className="flex items-center space-x-1">
            <FaUser className="text-teal-600" />
            <span>{task.assignee_id?.name || "Unassigned"}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <FaCheckCircle
              className={`text-${task.status === "Done" ? "green" : "yellow"}-600`}
          />
          <span>{task.status === "Done" ? "Completed" : "In Progress"}</span>
        </div>

        <div className="mt-4">
        <span
            className={`text-xs font-semibold ${
                task.status === "Done" ? "text-green-600" : "text-yellow-600"
            }`}
        >
          {task.status === "Done" ? "Completed" : "In Progress"}
        </span>
        </div>
      </div>
  );
};


export default TasksPage;