import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(null);

    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(usersData);
    }, []);

    const handleEdit = (index) => {
        navigate(`/users/edit-user/${users[index].id}`);
    };


    const handleShowDeleteModal = (index) => {
        setShowDeleteModal(true);
        setCurrentUserIndex(index);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCurrentUserIndex(null);
    };

    const handleDelete = () => {
        const updatedUsers = [...users];
        updatedUsers.splice(currentUserIndex, 1);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        handleCloseDeleteModal();
    };

  

    return (
        <>
            <Nav />
            <div className="container">
                <h2 className="mt-4">User List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    {user.id !== loggedUser.id && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleShowDeleteModal(index)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this user?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default UsersList;
