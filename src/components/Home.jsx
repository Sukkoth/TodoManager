import React from 'react';
import { useEffect, useState } from 'react';
import Search from './Search';
import Todos from './Todos';
import Filter from './Filter';
import { ClapSpinner } from 'react-spinners-kit';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';

import BACKEND_API from './BACKEND_API';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorFetching, setErrorFetching] = useState(null);
    useEffect(() => {
        const setData = async () => {
            const data = await BACKEND_API.index(
                setErrorFetching,
                setIsLoading
            );
            setTodos(data);
        };
        setData();
    }, []);

    const handleFilterAndSort = async (requestOption) => {
        const data = await BACKEND_API.index(
            setErrorFetching,
            setIsLoading,
            requestOption
        );
        setTodos(data);
    };
    /**
     * @param {ObjectId} todoId
     * @desc Delete Task given the Id
     * @triggeredBy {ReactComponent} Todo
     */
    const handleDeleteTask = async (todoId) => {
        const deletedId = await BACKEND_API.delete(
            setErrorFetching,
            setIsLoading,
            todoId
        );
        if (deletedId) {
            setTodos(
                todos.filter((todo) => {
                    return todo._id != todoId;
                })
            );
            NotificationManager.warning('Todo Deleted!', 'Deleted!', 2000);
        } else {
            NotificationManager.error('Failed to remove todo', 'Error!', 2000);
        }
    };

    /**
     *
     * @param {ObjectId} todoId
     * @desc Mark todo as completed
     * @triggeredBy {ReactComponent} Todo
     */
    const handleToggleCompleted = async (todoId) => {
        const todo = todos.find((todo) => {
            return todo._id === todoId;
        });
        const updatedTodo = await BACKEND_API.update(
            setErrorFetching,
            setIsLoading,
            todo
        );

        if (updatedTodo) {
            setTodos(
                todos.map((todo) => {
                    if (todo._id === todoId) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                })
            );
            NotificationManager.info('Todo Updated');
        } else {
            NotificationManager.error('Server Error');
        }
    };

    /**
     *
     * @param {String} searchKey
     * @desc Handle search functionality
     * @triggeredBy {ReactComponent} Search
     */
    const handleSearch = async (searchKey) => {
        const searchResult = await BACKEND_API.search(
            setErrorFetching,
            setIsLoading,
            searchKey
        );
        setTodos(searchResult);
    };

    const handleEmptySeachKey = async () => {
        const data = await BACKEND_API.index(setErrorFetching, setIsLoading);
        setTodos(data);
    };

    return (
        <>
            <Search
                handleSearch={handleSearch}
                handleEmptySeachKey={handleEmptySeachKey}
            />
            <Filter handleFilterAndSort={handleFilterAndSort} />
            {!errorFetching && isLoading && (
                <div style={{ alignSelf: 'center', padding: '20px' }}>
                    <ClapSpinner
                        size={60}
                        color="#686769"
                        loading={isLoading}
                    />
                </div>
            )}

            {!errorFetching && !isLoading && (
                <>
                    <Todos
                        todos={todos}
                        deleteTask={handleDeleteTask}
                        toggleCompleted={handleToggleCompleted}
                    />
                </>
            )}

            {errorFetching && (
                <h4 style={{ color: 'red', alignSelf: 'center' }}>
                    Failed to fetch data!
                </h4>
            )}
        </>
    );
};

export default Home;
