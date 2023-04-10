//*Components
import AddTodo from './components/AddTodo';

import Home from './components/Home';

//*Icons start
import { FaPlus, FaTimes } from 'react-icons/fa';

//*React Library and related
import { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//*React Notification
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import About from './components/About';

//*Custom functions

const App = () => {
    const [toggleAdd, setToggleAdd] = useState(false);

    return (
        <div className="row d-flex justify-content-center container">
            <div className="col-md-8">
                <Router>
                    <div className="card-hover-shadow-2x mb-3 card">
                        <div className="card-header-tab card-header d-flex justify-content-between">
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                <Link to="/" className="mr-4">
                                    <i className="fa fa-tasks"></i>&nbsp;Todo
                                    Lists
                                </Link>
                                <Link to="/add" className="mr-4">
                                    <i className="fa fa-plus"></i>&nbsp;Add todo
                                </Link>
                                <Link to="/about" className="mr-4">
                                    <i className="fa fa-user"></i>&nbsp;About
                                </Link>
                            </div>
                        </div>
                        <Routes>
                            <Route
                                exact
                                path="/add"
                                element={<AddTodo />}
                            ></Route>
                            <Route exact path="/" element={<Home />}></Route>
                            <Route
                                exact
                                path="/about"
                                element={<About />}
                            ></Route>
                        </Routes>
                    </div>
                </Router>
            </div>
            <NotificationContainer />
        </div>
    );
};

export default App;
