import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { NotificationManager } from 'react-notifications';

const AddTodo = (props) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState(null);

    const handleCreateTodo = (e) => {
        e.preventDefault();
        if (!title) {
            NotificationManager.error('Todo Title required');
            return;
        }
        const task = {
            title,
            reminder,
            completed: false,
        };

        props.createTodo(task);
        setTitle('');
    };
    return (
        <form onSubmit={handleCreateTodo}>
            <div
                className="form-group d-flex flex-column align-items-end justify-items-center mb-5 border border-dark p-5 rounded"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <input
                    className="form-control"
                    type="text"
                    id="Add"
                    placeholder="Add task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="datetime-local" className="form-control mt-3" />
                <button className="btn btn-primary w-25 mt-3">
                    <FaPlus />
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
