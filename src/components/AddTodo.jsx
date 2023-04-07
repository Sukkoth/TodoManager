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
                className="form-group"
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
                <button
                    className="btn btn-primary"
                    style={{ marginLeft: '25px', marginRight: '10px' }}
                >
                    <FaPlus />
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
