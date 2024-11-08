import React, { useState } from "react";
import "./TodoApp.css";
import { nanoid } from 'nanoid';
import TodoAddInput from "./components/TodoAddInput";
import TodoList from "./components/TodoList";
import TodoBoard from "./components/TodoBoard";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [editingTodos, setEditingTodos] = useState([]);


  const addTodo = () => {
    if (!todoTitle.trim()) return alert("task title cannot be empty.");
    const newTask = {
      id: nanoid(),
      title: todoTitle,
      status: "pending",
      isEditing: false
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setTodoTitle("");
  };

  const handleAddTodoKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(prevTodos =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" }
          : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingTodos((prev) => ({
      ...prev,
      [todo.id]: todo.title
    }));
  };

  const saveEditTodo = (id) => {
    if (!editingTodos[id] || editingTodos[id].trim() === "") return alert("task title cannot be empty.");
    setTodos(prevTodos =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editingTodos[id] } : todo
      )
    );
    setEditingTodos((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleEditKeyDown = (event, id) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEditTodo(id);
    }
  }

  return (
    <div className="todo-app">
      <h1>TodoList App</h1>
      <TodoAddInput
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        addTodo={addTodo}
        handleAddTodoKeyDown={handleAddTodoKeyDown}
      />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleStatus={toggleStatus}
        startEditing={startEditing}
        saveEditTodo={saveEditTodo}
        editingTodos={editingTodos}
        setEditingTodos={setEditingTodos}
        handleEditKeyDown={handleEditKeyDown}
      />

      <hr></hr>
      <h1>Board Mode</h1>
      <TodoBoard todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoApp;
