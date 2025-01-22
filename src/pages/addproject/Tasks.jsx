import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FaPlus, FaCalendarAlt, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const initialColumns = {
  backlog: {
    name: 'Backlog',
    tasks: [
      { id: 'task-1', title: 'Design UI', description: 'Create a design for the new UI', status: 'To Do', priority: 'High', deadline: '2025-01-07', assignee_id: 'user-1', completed: false },
      { id: 'task-2', title: 'Set Up API', description: 'Set up a RESTful API for the app', status: 'To Do', priority: 'Medium', deadline: '2025-01-08', assignee_id: 'user-2', completed: false }
    ]
  },
  todo: { name: 'To Do', tasks: [] },
  doing: { name: 'Doing', tasks: [] },
  done: { name: 'Done', tasks: [] }
};

const users = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
  { id: 'user-3', name: 'Robert White' },
];

const TasksPage = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee_id: '',
    priority: 'Medium',
    deadline: ''
  });
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle the drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = active.data.current.droppableId;
    const destinationColumn = over.data.current.droppableId;

    // Get the task that was moved
    const task = columns[sourceColumn].tasks.find(task => task.id === active.id);

    // Prevent dragging completed tasks back to another column
    if (task?.completed && destinationColumn !== 'done') {
      setErrorMessage("You can't move a completed task back to another column!");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (destinationColumn === 'done' && sourceColumn !== 'done') {
      task.completed = true;
    }

    if (sourceColumn !== destinationColumn) {
      const sourceTasks = [...columns[sourceColumn].tasks];
      const [movedTask] = sourceTasks.splice(active.index, 1);

      // Add the task to the destination column
      const destinationTasks = [...columns[destinationColumn].tasks];
      destinationTasks.splice(over.index, 0, movedTask);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [sourceColumn]: { ...prevColumns[sourceColumn], tasks: sourceTasks },
        [destinationColumn]: { ...prevColumns[destinationColumn], tasks: destinationTasks }
      }));
    }
  };

  const addNewTask = () => {
    const newTaskWithId = { ...newTask, id: uuidv4(), project_id: 'some_project_id' };
    const taskData = { ...newTaskWithId, created_at: new Date(), updated_at: new Date() };

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })
      .then(response => response.json())
      .then(data => {
        setColumns((prevColumns) => ({
          ...prevColumns,
          backlog: {
            ...prevColumns.backlog,
            tasks: [...prevColumns.backlog.tasks, data],
          },
        }));

        setNewTask({ title: '', description: '', assignee_id: '', priority: 'Medium', deadline: '' });
        setNewTaskModal(false);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Task Management</h1>

        <button
          onClick={() => setNewTaskModal(true)}
          className="mb-6 px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-all duration-300"
        >
          <FaPlus className="inline-block mr-2" /> Add New Task
        </button>

        <DndContext onDragEnd={handleDragEnd} onDragStart={({ active }) => setActiveTask(active)}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(columns).map(([columnId, column]) => (
              <DroppableColumn key={columnId} columnId={columnId} column={column} handleTaskClick={handleTaskClick} />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white p-6 rounded-lg shadow-lg w-60">
                <h3 className="font-bold text-teal-800">{columns[activeTask.data.current.droppableId].tasks.find(task => task.id === activeTask.id)?.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <FaCalendarAlt className="inline-block mr-1" />
                  {columns[activeTask.data.current.droppableId].tasks.find(task => task.id === activeTask.id)?.deadline}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <FaUser className="inline-block mr-1" />
                  {columns[activeTask.data.current.droppableId].tasks.find(task => task.id === activeTask.id)?.assignee_id}
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
            <h2 className="text-2xl font-bold text-teal-800 mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={newTask.assignee_id}
                onChange={(e) => setNewTask({ ...newTask, assignee_id: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Assign to</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
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
            <h2 className="text-2xl font-bold text-teal-800 mb-4">{selectedTask.title}</h2>
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
      <h2 className="text-2xl font-semibold text-teal-800 mb-4">{column.name}</h2>
      <SortableContext items={column.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 min-h-[200px]">
          {column.tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} columnId={columnId} index={index} handleTaskClick={handleTaskClick} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const TaskCard = ({ task, columnId, index, handleTaskClick }) => {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: task.id,
    data: { droppableId: columnId },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => handleTaskClick(task)}
      className="bg-gradient-to-r from-teal-100 to-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
    >
      <h3 className="font-bold text-teal-800">{task.title}</h3>
      <p className="text-sm text-gray-600">
        <FaCalendarAlt className="inline-block mr-1" /> {task.deadline}
      </p>
      <p className="text-sm text-gray-600">
        <FaUser className="inline-block mr-1" /> {task.assignee_id}
      </p>
      {task.completed && (
        <div className="text-green-500 mt-2">
          <FaCheckCircle className="inline-block mr-1" /> Completed
        </div>
      )}
    </div>
  );
};

export default TasksPage;
