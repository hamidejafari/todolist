import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TodoBoard({ todos, setTodos }) {
  const statuses = ["pending", "completed"];
  const onDragEnd = (result) => {
    const { draggableId, destination, source } = result;
    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
      return;
    }

    const destinationColumn = destination.droppableId;

    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      const taskIndex = updatedTodos.findIndex(todo => todo.id === draggableId);
      updatedTodos[taskIndex] = { ...updatedTodos[taskIndex], status: destinationColumn };
      return updatedTodos;
    });
  };

  const getTodosByStatus = (status) => {
    return todos.filter(item => item.status === status)
  };

  return (
    <div className="todo-board">
      <DragDropContext onDragEnd={onDragEnd}  dragHandleProps={{ 'data-testid': 'drag-handle' }}>
        {
          statuses.map((status) => (
            <div className="board-column">
              <h2>{status} tasks</h2>
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="todo-list"
                  >
                    {getTodosByStatus(status).map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="todo-board-item"
                          >
                            {todo.title}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))
        }
      </DragDropContext>
    </div>
  );
}

export default TodoBoard;
