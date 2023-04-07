import React from 'react';
import Todo from './Todo';

const Todos = (props) => {
    return (
        <div style={{ position: 'static' }} className="ps ps--active-y">
            <div className="ps-content">
                {props.todos.length > 0 ? (
                    <ul className=" list-group list-group-flush">
                        {props.todos.map((todo) => {
                            return (
                                <Todo
                                    key={todo._id}
                                    todo={todo}
                                    deleteTask={props.deleteTask}
                                    toggleCompleted={props.toggleCompleted}
                                />
                            );
                        })}
                    </ul>
                ) : (
                    <h4
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            padding: '30px',
                        }}
                    >
                        Empty List!
                    </h4>
                )}
            </div>
        </div>
    );
};

export default Todos;
