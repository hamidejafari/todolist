import React from "react";

function TodoItem({
    todo,
    editingTodos,
    setEditingTodos,
    handleEditKeyDown,
    saveEditTodo,
    startEditing,
    toggleStatus,
    deleteTodo
}) {
    return (
        <li key={todo.id} className="todo-item">
            {editingTodos[todo.id] !== undefined ?
                (
                    <input
                        type="text"
                        placeholder="edit task title"
                        className="todo-input"
                        value={editingTodos[todo.id]}
                        onChange={(e) => setEditingTodos({
                            ...editingTodos,
                            [todo.id]: e.target.value
                        })}
                        onKeyDown={(event) => handleEditKeyDown(event, todo.id)}
                    />
                )
                : (
                    <span className={todo.status === "completed" ? "completed" : ""}>
                        {todo.title} - {todo.status}
                    </span>
                )
            }
            <div className="buttons">
                {editingTodos[todo.id] !== undefined ?
                    <button onClick={() => saveEditTodo(todo.id)} className="edit-button">save</button>
                    :
                    <button onClick={() => startEditing(todo)} className="edit-button">edit</button>
                }
                <button onClick={() => toggleStatus(todo.id)} className={`toggle-button button-${todo.status}`}>
                    mark as {todo.status === "pending" ? "completed" : "pending"}
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-button">delete</button>
            </div>
        </li>
    );
}

export default TodoItem;