import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { NotificationManager } from 'react-notifications';
import BACKEND_API from './BACKEND_API';

const AddTodo = (props) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState(null);
    const [errorCreating, setErrorCreating] = useState('');

    /**
     * @param {Object} todo
     * @desc create a todo passed from AddTask Component
     * @triggeredBy {ReactComponent} AddTodo
     */
    const createTodo = async (todo) => {
        const newTodo = await BACKEND_API.store(setErrorCreating, todo);

        if (!newTodo)
            return NotificationManager.error(
                'Failed to create!',
                'FAILED!',
                2000
            );
        NotificationManager.success('Todo Created!', 'Success!', 2000);
    };

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

        createTodo(task);
        setTitle('');
    };
    return (
        <form onSubmit={handleCreateTodo}>
            <div
                className="form-group d-flex flex-column align-items-end justify-items-center mb-5 border border-primary p-5 rounded"
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
                <input
                    type="datetime-local"
                    className="form-control mt-3"
                    onChange={(e) => setReminder(e.target.value)}
                />
                <button className="btn btn-primary mt-3">
                    <FaPlus />
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
