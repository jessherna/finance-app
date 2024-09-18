import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Transactions from './components/Transactions';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/transactions" element={<ProtectedRoute element={Transactions} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;