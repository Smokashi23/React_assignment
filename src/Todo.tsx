import React, { useState } from 'react';
import './Todo.css';

interface TodoItem {
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [todo, setTodo] = useState<string>('');
  const [array, setArray] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todo.trim() !== '') {
      setArray([...array, { todo, completed: false }]);
      setTodo('');
    } else {
      alert('Enter task');
    }
  };
  const handleInput = (str: string) => {
    setTodo(str);
  };

  const deleteTodo = (index: number) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const Completion = (index: number) => {
    const newArray = [...array];
    newArray[index].completed = !newArray[index].completed;
    setArray(newArray);
  };

  return (
    <div className="todo-container">
      <h1>Todo app</h1>
      <input type="text" value={todo} onChange={(e) => handleInput(e.target.value)} />
      <button onClick={addTodo}> Add Todo</button>
      <div>
      <ul>
        {array.map((item: TodoItem, index: number) => (
          <li key={index}>
            <input type="checkbox" checked={item.completed} onChange={() => Completion(index)} />
            {item.todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {array.map((item: TodoItem, index: number) => (
          item.completed && (
            <li key={index}>
              {item.todo}
            </li>
          )
        ))}
      </ul>
    </div>
    <h2>Uncompleted Todos</h2>
      <ul>
        {array.map((item: TodoItem, index: number) => (
          !item.completed && (
            <li key={index}>
              {item.todo}
            </li>
          )
        ))}
      </ul>
    </div>
  </div>
    
  );
};

export default Todo;
