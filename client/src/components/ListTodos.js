import React, { useEffect, useState } from 'react';
import EditTodos from './EditTodos';

export default function ListTodos() {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id)=>{
        try {
            const deletetodo = await fetch(`http://localhost:4000/todos/${id}`,
                {
                    method: "DELETE"
    
                }
            );

            console.log(deletetodo);
            getData();
        } catch (error) {
            console.log(error.message);
        }
    }

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:4000/todos");
            const data = await response.json();

            setTodos(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <table className="table table-hover mt-4 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo) =>
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodos todo={todo}/></td>
                                <td>
                                    <button className='btn btn-danger'
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
