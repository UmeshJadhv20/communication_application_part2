import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.id === Number(id));

        if (user) {
            setFullname(user.name);
            setEmail(user.email);
        } else {            
            navigate('/users');
        }
    }, [id, navigate]);

    const handleSaveChanges = (e) => {
        e.preventDefault();

        let formErrors = {};

        if (!fullname) {
            formErrors.fullname = 'Please enter your fullname.';
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        setFullnameError(formErrors.fullname);
        setEmailError(formErrors.email);

        if (Object.keys(formErrors).length === 0) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(user =>
                user.id === Number(id) ? { ...user, name: fullname, email: email } : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            navigate('/users');
        }
    };

    return (
        <div className="container">
            <div className="mt-5">
                <div className="card">
                    <div className="card-header">
                        Edit User Information
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSaveChanges} className="needs-validation" noValidate>
                            <div className="mb-3">
                                <label htmlFor="fullname" className="form-label">Fullname</label>
                                <input type="text" className={`form-control ${fullnameError ? 'is-invalid' : ''}`} id="fullname"  value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}  />
                                {fullnameError && <div className="invalid-feedback">{fullnameError}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email"  className={`form-control ${emailError ? 'is-invalid' : ''}`}  id="email"  value={email} onChange={(e) => setEmail(e.target.value)}  />
                                {emailError && <div className="invalid-feedback">{emailError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
