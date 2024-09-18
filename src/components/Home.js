import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="jumbotron text-center">
                <h1 className="display-4">Welcome to Finance App</h1>
                <p className="lead">Manage your finances with ease and efficiency.</p>
                <hr className="my-4" />
                <p>Sign up today and take control of your financial future.</p>
                <button className="btn btn-primary btn-lg" onClick={handleRegister}>Register</button> &nbsp;
                <button className="btn btn-secondary btn-lg" onClick={handleLogin}>Login</button>
            </div>
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Track Expenses</h5>
                            <p className="card-text">Easily track your daily expenses and manage your budget.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Set Goals</h5>
                            <p className="card-text">Set financial goals and monitor your progress.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Get Insights</h5>
                            <p className="card-text">Gain insights into your spending habits with detailed reports.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;