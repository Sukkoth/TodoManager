const BASE_URL = 'http://localhost:4500/api/v1/todos';
exports.index = async (setErrorFetching, setIsLoading, requestQuery = '') => {
    setErrorFetching('');
    setIsLoading(true);
    try {
        const response = await fetch(BASE_URL + requestQuery);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setErrorFetching(null);
        return data.data.todos;
    } catch (error) {
        setErrorFetching(error.message);
    } finally {
        setIsLoading(false);
    }
};

exports.search = async (setErrorFetching, setIsLoading, searchKey) => {
    setIsLoading(true);
    setErrorFetching('');
    try {
        const response = await fetch(`${BASE_URL}/?search=${searchKey}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setErrorFetching(null);
        return data.data.todos;
    } catch (error) {
        setErrorFetching(error.message);
    } finally {
        setIsLoading(false);
    }
};

exports.store = async (setErrorFetching, setIsLoading, todo) => {
    setIsLoading(true);
    const requestObject = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(todo),
    };
    try {
        const response = await fetch(BASE_URL, requestObject);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setErrorFetching(null);
        return data.data.todo;
    } catch (error) {
        setErrorFetching(error.message);
    } finally {
        setIsLoading(false);
    }
};

exports.delete = async (setErrorFetching, setIsLoading, todoId) => {
    setIsLoading(true);
    const requestObject = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
    };
    try {
        const response = await fetch(`${BASE_URL}/${todoId}`, requestObject);
        if (!response.ok) throw new Error('Failed to fetch data');
        setErrorFetching(null);
        const data = await response.json();
        return data.id;
    } catch (error) {
        setErrorFetching(error.message);
    } finally {
        setIsLoading(false);
    }
};

exports.update = async (setErrorFetching, setIsLoading, todo) => {
    // setIsLoading(true);
    const requestObject = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
    };
    try {
        const response = await fetch(`${BASE_URL}/${todo._id}`, requestObject);
        if (!response.ok) throw new Error('Server Error!');
        setErrorFetching(null);
        const data = await response.json();
        return data.data.todo;
    } catch (error) {
        setErrorFetching(error.message);
    } finally {
        setIsLoading(false);
    }
};
