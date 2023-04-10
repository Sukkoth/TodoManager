import { Link } from 'react-router-dom';
const About = () => {
    return (
        <div className="d-flex flex-column p-4">
            <p>
                <span className="text text-primary">Name: </span>Gadisa Teklu
            </p>
            <p>
                <span className="text text-primary">Email: </span>
                Suukootj@gmail.com
            </p>
            <p>
                <span className="text text-primary">Phone: </span>
                +251-90658-2283
            </p>

            <Link className="btn btn-primary" to="/">
                Home
            </Link>
        </div>
    );
};

export default About;
