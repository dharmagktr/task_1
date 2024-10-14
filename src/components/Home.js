// Filename - components/Home.js

import React, { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Home() {
    let history = useNavigate();
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    // Function to set the ID, Name, and Age in local storage
    function setID(id, name, age) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
    }
    const handelSubmit = (e) => {
        e.preventDefault(); // Prevent reload

        const ids = uuid(); // Creating unique id
        let uni = ids.slice(0, 8); // Slicing unique id

        // Fetching a value from usestate and
        // pushing to javascript object
        let a = name,
            b = age;
        if (name == "" || age == "") {
            alert("invalid input");
            return;
        }
        array.push({ id: uni, Name: a, Age: b });
        setIsOpen(false);
        // Redirecting to home page after creation done
        history("/");
    };
    // Function to delete an entry
    function deleted(id) {
        let index = array
            .map(function (e) {
                return e.id;
            })
            .indexOf(id);

        // Deleting the entry with the specified index
        array.splice(index, 1);

        // Redirecting to the same page to re-render
        history("/");
    }

    // for Modal

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">User Management</h1>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.Name}</td>
                                <td>{item.Age}</td>
                                <td>
                                    <Link to={`/edit`}>
                                        <Button
                                            onClick={() => setID(item.id, item.Name, item.Age)}
                                            variant="info"
                                            className="me-2"
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => deleted(item.id)}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="d-grid gap-2 mt-4">

                <div style={{width: '100%'}}>
                    <Button onClick={openModal} variant="success" size="lg">
                        Create New User
                    </Button>
                </div>
                {/* <button onClick={openModal}>Open Modal</button>
                <Link to="/create">
                    <Button variant="success" size="lg">
                        Create New User
                    </Button>
                </Link> */}
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <button onClick={closeModal}>close</button>
                {/* <div>I am a modal</div> */}
                <Form
                    className="d-grid gap-2"
                    style={{ margin: "5rem" }}
                >
                    {/* Fetching a value from input textfirld 
                    in a setname using usestate*/}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicName"
                    >
                        <Form.Control
                            onChange={(e) =>
                                setname(e.target.value)
                            }
                            type="text"
                            placeholder="Enter Name"
                            required
                        />
                    </Form.Group>

                    {/* Fetching a value from input textfirld in
                    a setage using usestate*/}
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicAge"
                    >
                        <Form.Control
                            onChange={(e) =>
                                setage(e.target.value)
                            }
                            type="number"
                            placeholder="Age"
                            required
                        />
                    </Form.Group>

                    {/* handing a onclick event in button for
                    firing a function */}
                    <Button
                        onClick={(e) => handelSubmit(e)}
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>

                    {/* Redirecting back to home page */}
                    {/* <Link className="d-grid gap-2" to="/">
                        <Button variant="info" size="lg">
                            Home
                        </Button>
                    </Link> */}
                </Form>
            </Modal>
        </div>
    );
}

export default Home;