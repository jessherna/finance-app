import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../axiosInstance';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        date: '',
        description: '',
        amount: ''
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('/api/transactions');
                const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/transactions', newTransaction);
            const updatedTransactions = [response.data, ...transactions];
            const sortedTransactions = updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(sortedTransactions);
            setShowModal(false);
            setNewTransaction({ date: '', description: '', amount: '' });
        } catch (error) {
            console.error('Error recording transaction:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Transactions</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Record Transaction</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction._id}>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                            <td>{transaction.description}</td>
                            <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Record Transaction</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="date"
                                            name="date"
                                            value={newTransaction.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={newTransaction.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            value={newTransaction.amount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;