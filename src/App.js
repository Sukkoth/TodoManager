//*Components

import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Search from './components/Search';

//*Icons start
import { FaPlus, FaTimes } from 'react-icons/fa';

//*React Library and related
import { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';

//*React Notification
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';

import { ClapSpinner } from 'react-spinners-kit';
//*Custom functions
import BACKEND_API from '../src/components/BACKEND_API';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorFetching, setErrorFetching] = useState(null);
    const [toggleAdd, setToggleAdd] = useState(false);
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

    /**
     * @param {Object} todo
     * @desc create a todo passed from AddTask Component
     * @triggeredBy {ReactComponent} AddTodo
     */
    const handleCreateTodo = async (todo) => {
        const newTodo = await BACKEND_API.store(
            setErrorFetching,
            setIsLoading,
            todo
        );
        NotificationManager.success('Todo Created!', 'Success!', 2000);
        if (newTodo) {
            setTodos([...todos, newTodo]);
        } else {
            NotificationManager.error('Failed to create todo', 'Error!', 2000);
        }
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
        <div className="row d-flex justify-content-center container">
            <div className="col-md-8">
                <div className="card-hover-shadow-2x mb-3 card">
                    <div className="card-header-tab card-header d-flex justify-content-between">
                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i className="fa fa-tasks"></i>&nbsp;Task Lists
                        </div>
                        <div>
                            <button
                                className={
                                    !toggleAdd === true
                                        ? 'btn btn-success'
                                        : 'btn btn-danger'
                                }
                                onClick={() => setToggleAdd(!toggleAdd)}
                            >
                                {toggleAdd == false ? <FaPlus /> : <FaTimes />}
                            </button>
                        </div>
                    </div>
                    {toggleAdd && <AddTodo createTodo={handleCreateTodo} />}
                    <Search
                        handleSearch={handleSearch}
                        handleEmptySeachKey={handleEmptySeachKey}
                    />
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
                        <Todos
                            todos={todos}
                            deleteTask={handleDeleteTask}
                            toggleCompleted={handleToggleCompleted}
                        />
                    )}

                    {errorFetching && (
                        <h4 style={{ color: 'red', alignSelf: 'center' }}>
                            Failed to fetch data!
                        </h4>
                    )}

                    <div className="d-block text-right card-footer">
                        <button className="mr-2 btn btn-link btn-sm">
                            Cancel
                        </button>
                        <button className="btn btn-primary">Add Task</button>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
};

export default App;
