import {useState, useEffect, useContext} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import { UrlContext } from '../context/urlContext';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCurrentList, addTransaction} from '../library/transactions';




function Transactions() {
    const url = useContext(UrlContext);

    const [clientList, updateClientList] = useState([]);
    const [bucketList, updateBucketList] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [returningBucket, setReturningBucket] = useState([]);
    const [newBucket, setNewBucket] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setAddSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")

    async function startSubmit() {
        setError(false)
        if((!selectedClient.length || !returningBucket.length || !newBucket.length)) {
            setErrorMessage("Please fill out all of the categories to continue")
            setError(true)
        }
        else {

            if (returningBucket[0].id === newBucket[0].id) {
                console.log("same buckets dummy")
                setErrorMessage("Robert, those are the same damn buckets dummy");
                setError(true)
            }
            else {
                const date = moment().format('YYYY-MM-DD HH:mm:ss')
                const selectedId = selectedClient[0].id;
                const returningId = returningBucket[0].id;
                const newBucketId = newBucket[0].id;
                const result = await addTransaction({selectedId, returningId, newBucketId, date}, url)
                if(result.rowCount === 1) {
                    setSuccessMessage("You have successfully added this transaction");
                    setAddSuccess(true)
                }
            }
        }
    }

    useEffect (() => {
        try{
            getCurrentList(url)
            .then((res) => {
                const newClientFormat = [];
                const newBucketFormat = [];
                const {bucketResults, clientResults} = res;
                clientResults.forEach((client) => {
                  const newFormat = {id: client.client_id, label: `${client.first_name} ${client.last_name}`}
                  newClientFormat.push(newFormat)
                })

                bucketResults.forEach((bucket) => {
                  const newFormat = {id: bucket.bucket_id, label: bucket.bucket_name}
                  newBucketFormat.push(newFormat)
                })
                updateBucketList(newBucketFormat);
                updateClientList(newClientFormat)
            })
        }
        catch(error) {
            console.log(error)
            setError(true)
        }
        
    }, [])
  
    return (
        <div className="text-center">
            <h1>Transactions</h1>
            {success? <h3 className="text-success">{successMessage}</h3>: null}
            {error ? <h3 className="text-danger">{errorMessage}</h3>: null}
            {bucketList.length && clientList.length ? 
                <Form.Group>
                    <Form.Label>Client Name</Form.Label>
                        <Typeahead 
                            id="clients"
                            label="Name"
                            options={clientList}
                            onChange={(selected) => {
                                setSelectedClient(selected)
                            }}
                        />
                    
                    <Form.Label>Returning Bucket</Form.Label>
                        <Typeahead 
                            id="buckets"
                            label="Bucket"
                            options={bucketList}
                            onChange={(selected) => {
                                setReturningBucket(selected)
                            }}
                        />
                    <Form.Label>New Bucket</Form.Label>
                        <Typeahead 
                            id="buckets"
                            label="Bucket"
                            options={bucketList}
                            onChange={(selected) => {
                                setNewBucket(selected)
                            }}
                        />
                        
                    <Button onClick={ ()=> startSubmit()} className="m-2">Submit</Button>
                </Form.Group>
                : null
            } 
        </div>
    )
}

export default Transactions;