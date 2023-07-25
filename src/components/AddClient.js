
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { addClient, verifyForm } from '../library/addClient';
import { UrlContext } from '../context/urlContext';


function AddClient() {

    const url = useContext(UrlContext)

    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [address, updateAddress] = useState("");
    const [phoneNumber, updatePhoneNumber] = useState("");
    const [email, updateEmail] = useState("");
    const [location, updateLocation] = useState(""); 
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false)
    const [newClientId, setClientId] = useState(null);
    

    async function startSubmit (formData) {
        setError("")
        const validForm =  await verifyForm(formData);
        validForm.status === "error" ? setError(validForm.message) : console.log("success")
       
        const result =  await addClient(formData, url);
        if(result.status === "success") {
            setClientId(result.id);
            setAddSuccess(true);
        }
        else {
            setError("Error adding new client. Please try again");
        }
    }   

    return (
        <div className="text-center mt-5">
            <h1>Add Client</h1>
            {
            addSuccess === true ? 
            <>
                <div>Congratulations! {firstName} {lastName} has been successully added. Now lets get them a bucket!</div>
                <Link to={`/assign-bucket/${newClientId}`}><buttton className="btn btn-primary">Assign Bucket</buttton></Link>
            </>
            

            : 
            <Form>
                {error.length ? <h5 className="text-danger">{error}</h5>: null}
                <Form.Group className="mb-3" controlId='firstName'>  
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={(e) => {updateFirstName(e.target.value)}} size="lg" type="input" placeholder='First Name' />
                </Form.Group>
                <Form.Group className="mb-3" controlId='lastName'>  
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={(e) => {updateLastName(e.target.value)}} size="lg" type="input" placeholder='Last Name' />
                </Form.Group>
                <Form.Group className="mb-3" controlId='address'>  
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e) => {updateAddress(e.target.value)}} size="lg" type="input" placeholder='Address' />
                </Form.Group>
                <Form.Group className="mb-3" controlId='phoneNumber'>  
                    <Form.Label>Phone #</Form.Label>
                    <Form.Control onChange={(e) => {updatePhoneNumber(e.target.value)}} size="lg" type="phone" placeholder='Phone Number' />
                </Form.Group>
                <Form.Group className="mb-3" controlId='email'>  
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => {updateEmail(e.target.value)}} size="lg" type="email" placeholder='Email' />
                </Form.Group>
                <Form.Group className="mb-3" controlId='locationAcquired'>  
                    <Form.Label>Location Acquired</Form.Label>
                    <Form.Control onChange={(e) => {updateLocation(e.target.value)}} size="lg" type="input" placeholder='Location Acquired' />
                </Form.Group>
                <Button onClick={ ()=> startSubmit({firstName, lastName, address, phoneNumber, email, location})}className="m-2">Submit</Button>
            </Form>                   
            }
        </div>
    )
}

export default AddClient;