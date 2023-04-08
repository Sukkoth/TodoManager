import React from 'react';
import TimeAgo from 'react-timeago';

import { FaBell, FaBellSlash } from 'react-icons/fa';

const Todo = (props) => {
    return (
        <li className="list-group-item">
            <div
                className={
                    props.todo.completed == true
                        ? 'todo-indicator bg-danger'
                        : 'todo-indicator bg-success'
                }
            ></div>
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                    <div className="widget-content-left mr-2">
                        <div className="custom-checkbox custom-control">
                            <input
                                className="custom-control-input"
                                id={props.todo._id}
                                type="checkbox"
                                checked={props.todo.completed}
                                onChange={() =>
                                    props.toggleCompleted(props.todo._id)
                                }
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={props.todo._id}
                            >
                                &nbsp;
                            </label>
                        </div>
                    </div>
                    <div className="widget-content-left flex2">
                        <div
                            className={
                                props.todo.completed == true
                                    ? 'widget-heading todo-completed'
                                    : 'widget-heading'
                            }
                        >
                            {props.todo.title}
                        </div>
                        <div className="widget-subheading">
                            {props.todo.reminder != null ? (
                                <FaBell style={{ marginRight: '5px' }} />
                            ) : (
                                <FaBellSlash
                                    style={{ marginRight: '5px', color: 'red' }}
                                />
                            )}
                            <TimeAgo
                                date={props.todo.reminder}
                                onChange={(e) =>
                                    console.log(e.target.outerText)
                                }
                                onTimeUpdate={(e) => console.log('Happening')}
                            />
                        </div>
                    </div>

                    <div className="widget-content-right">
                        <button
                            className="border-0 btn-transition btn btn-outline-success"
                            onClick={(e) => {
                                e.preventDefault();
                                props.toggleCompleted(props.todo._id);
                            }}
                        >
                            <i className="fa fa-check"></i>
                        </button>
                        <button
                            className="border-0 btn-transition btn btn-outline-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                props.deleteTask(props.todo._id);
                            }}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Todo;
