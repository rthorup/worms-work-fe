import { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UrlContext } from '../context/urlContext';
import { addBucket } from '../library/addBucket';


function AddBucket() {
    const url = useContext(UrlContext)

    const [error, setError] = useState("");
    const [bucketName, updateBucketName] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);

    

    async function startSubmit(formData) {
        const {bucketName} = formData; 
        setError("")
        if(!bucketName.length) {
            setError("You need to name your bucket before you can submit it. Come on Robert....")
        }
        else {
            const result = await addBucket(formData, url);
            console.log(result)
            if(result.status === "success") {
                console.log("success")
                setAddSuccess(true)
            }
            else {
                setError("Error adding new client. Please try again");
            }
        }
    }


    return (
        <div className="text-center">
            {
                addSuccess ?
                <div>
                    <h2>Bucket successfully added!</h2>
                </div>
                :
                <>
                    <h1 className="my-3">Add Bucket</h1>
                    <Form>
                        {error.length ? <h5 className="text-danger">{error}</h5>: null}
                        <Form.Group className="mb-3" controlId='bucketName'>  
                            <Form.Label>Bucket Name</Form.Label>
                            <Form.Control onChange={(e) => {updateBucketName(e.target.value)}} size="lg" type="input" placeholder='Bucket Name' />
                        </Form.Group>
                        <Button onClick={ ()=> startSubmit({bucketName})}className="m-2">Submit</Button>
                    </Form>
                </>
            }

        </div>
    )
}

export default AddBucket