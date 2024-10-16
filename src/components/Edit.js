
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
    
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    console.log(age);
    const [email, setEmail] = useState("");
    const [cnumber, setcnumber] = useState("");
    const [filee, setfilee] = useState("");
    const [fileeData, setfileeData] = useState([]);
    const [id, setId] = useState("");

    let history = useNavigate();

    let index = array
        .map(function (e) {
            return e.id;
        })
        .indexOf(id);
       
    const handelSubmit = (e) => {
        e.preventDefault();
        if (name == "" || age == "" || email == "" || cnumber == "" || filee == "" || fileeData == "") {
            alert("invalid input");
            return;
        }

        let a = array[index];
        console.log(a);
        
        a.Name = name;
        a.Age = age;
        a.Email = email;
        a.Cnumber = cnumber;
        a.Filee = filee;
        a.FileeData = fileeData;
    
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
   
    useEffect(() => {
        setName(localStorage.getItem("Name"));
        setAge(localStorage.getItem("Age"));
        setEmail(localStorage.getItem("Email"));
        setcnumber(localStorage.getItem("Cnumber"));
        setfilee(localStorage.getItem("Filee"));
        setfileeData(localStorage.getItem("FileeData"));
        setId(localStorage.getItem("id"));
    }, []);
  

    return (
        <div>
            <h1 className="wiser">Update</h1>
            <Form
                className="d-grid gap-2"
                style={{ margin: "5rem" }}
            >
               
                <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        type="text"
                        placeholder="Enter Name"
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formBasicAge"
                >
                    <Form.Control
                        value={age}
                        onChange={(e) =>
                            setAge(e.target.value)
                        }
                        type="number"
                        placeholder="Age"
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                >
                    
                    <Form.Control
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        type="email"
                        placeholder="Email"
                        
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicCnumber"
                >
                    <Form.Control
                        value={cnumber}
                        onChange={(e) =>
                            setcnumber(e.target.value)
                        }
                        type="number"
                        placeholder="Mobile Number"
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicFileeData"
                >
                    <Form.Control
                        // value={fileeData}
                        onChange={handleFileChange}
                        type="file"
                        placeholder="Upload File"
                    />
                    <img className="mt-4" height="100" src={fileeData}/>
                </Form.Group>

                <Button
                    onClick={(e) => handelSubmit(e)}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Update
                </Button>

                
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
