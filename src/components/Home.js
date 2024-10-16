// Filename - components/Home.js
import React, { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [email, setemail] = useState("");
    const [cnumber, setcnumber] = useState("");
    const [filee, setfilee] = useState("");
    const [fileeData, setfileeData] = useState([]);
    const [validated, setValidated] = useState(false);




    function setID(id, name, age, email, cnumber, filee, fileeData) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
        localStorage.setItem("Email", email);
        localStorage.setItem("Cnumber", cnumber);
        localStorage.setItem("Filee", filee);
        localStorage.setItem("FileeData", fileeData);
    }



    const handelSubmit = (e) => {
        e.preventDefault();

        const ids = uuid();
        console.log(ids);

        let uni = ids.slice(0, 8);
        console.log(uni);


        let a = name, b = age, c = email, d = cnumber, f = filee, h = fileeData;

        if (name == "" || age == "" || email == "" || cnumber == "" || filee == "" || fileeData == "") {
            alert("invalid input");
            return;
        }
        array.push({ id: uni, Name: a, Age: b, Email: c, Cnumber: d, Filee: f, FileeData: h });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setname("")
        setage("")
        setemail("")
        setcnumber("")
        setfilee("")
        setfileeData("")

        setValidated(true);
        setIsOpen(false);

        history("/");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("hi");

        const reader = new FileReader();
        reader.onloadend = () => {
            setfileeData(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
            setfilee(file.name);
        }
    };

    // function deleted(id) {
    //     let index = array
    //         .map((e) => {
    //             return e.id;
    //         })
    //         .indexOf(id);
    //  
    //     array.splice(index, 1);
    //     history("/");
    // }


    // function deleted(id) {
    //     var result = window.confirm("Want to delete?");
    //     if (result) {
    //         let index = array
    //         .map((e) => {
    //             return e.id;
    //         })
    //         .indexOf(id);

    //     array.splice(index, 1);
    //     history("/");
    //     }
    // }

    function deleted(id) {
        let index = array
            .map((e) => {
                return e.id;
            })
            .indexOf(id);
        array.splice(index, 1);
        history("/");
    }
    const deletedbefore = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3 className="text-center text-danger">Are you sure?</h3>
                        <p className="text-center text-warning">You want to delete this file?</p>
                        <div className="d-flex justify-content-between gap-2">
                            <button
                                className="btn btn-success"
                                onClick={onClose}>No, Sorry..!</button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    deleted(id);
                                    onClose();
                                }}
                            >
                                Yes, Delete it!
                            </button>
                        </div>
                    </div>
                );
            }
        });
    }


    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (

        <div style={{ margin: "2rem" }}>
            <h1 className="wiser">Using Crud</h1>
            <h1 className="text-center mb-4">Table Format</h1>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr className="bg-warning">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>File</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody >
                    {array.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-uppercase fw-bold">{item.Name}</td>
                                <td>{item.Age}</td>
                                <td className="fw-bold">
                                    <a href="#">{item.Email}</a>
                                    </td>
                                <td>{item.Cnumber}</td>
                                <td>
                                    <img height="100" src={item.FileeData} alt="image" />
                                </td>
                                <td>
                                    <Link to={"/edit"}>
                                        <Button
                                            onClick={() => setID(item.id, item.Name, item.Age, item.Email, item.Cnumber, item.Filee, item.FileeData)}
                                            variant="info"
                                            className="me-2 px-3 px-md-4"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    {/* <Button
                                        className="mt-3 mt-sm-0"
                                        // onClick={() => deleted(item.id)} 
                                        onClick={() => deleted(item.id)}

                                        variant="danger"
                                    >
                                        Delete
                                    </Button> */}
                                    <Button
                                        className="mt-3 mt-md-0"
                                        // onClick={() => deleted(item.id)} 
                                        onClick={() => deletedbefore(item.id)}

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
                <div style={{ width: '100%' }}>
                    <Button onClick={openModal} variant="success" size="lg">
                        Create New User
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="d-flex justify-content-end">
                    <button className="text-danger fw-bold " onClick={closeModal}> X </button>
                </div>
                <h3 className="text-center mb-3 text-success text-decoration-underline">Input Details</h3>
                <Form
                    noValidate
                    validated={validated}
                    className="d-grid gap-2"
                    style={{ margin: "5rem" }}
                >
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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail"
                    >
                        <Form.Control
                            onChange={(e) =>
                                setemail(e.target.value)
                            }
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                        />
                        <Form.Control.Feedback  >Looks Good</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicCnumber"
                    >
                        <Form.Control
                            onChange={(e) =>
                                setcnumber(e.target.value)
                            }
                            type="tel"
                            placeholder="Mobile Number"
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicFile"
                    >
                        <Form.Control
                            onChange={handleFileChange}
                            // key={this.state.theInputKey || ''}
                            type="file"
                            placeholder="File"
                            required
                        />
                        <img height="100" src={fileeData} />
                    </Form.Group>
                    <Button
                        onClick={(e) => handelSubmit(e)}
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}

export default Home;