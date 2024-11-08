import React from "react";
import TodoItem from "./TodoItem";
function TodoList({
    todos,
    editingTodos,
    setEditingTodos,
    handleEditKeyDown,
    saveEditTodo,
    startEditing,
    toggleStatus,
    deleteTodo
}) {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleStatus={toggleStatus}
                    startEditing={startEditing}
                    saveEditTodo={saveEditTodo}
                    editingTodos={editingTodos}
                    setEditingTodos={setEditingTodos}
                    handleEditKeyDown={handleEditKeyDown}
                />
            ))}
        </ul>
    );
}

export default TodoList;
