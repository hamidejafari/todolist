import React from "react";

function TodoAddInput({ todoTitle, setTodoTitle, addTodo, handleAddTodoKeyDown }) {
    return (
        <div className="input-section">
            <input
                type="text"
                placeholder="type task title and save with button or enter.."
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                onKeyDown={handleAddTodoKeyDown}
                className="todo-input"
            />
            <button onClick={addTodo} className="todo-button">add</button>
        </div>
    );
}

export default TodoAddInput;
