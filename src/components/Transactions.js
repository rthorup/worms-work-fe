import {useState, useEffect, useContext} from 'react'
import { Input, Typeahead } from 'react-bootstrap-typeahead'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import { UrlContext } from '../context/urlContext';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCurrentList, addTransaction, findBucketOwner} from '../library/transactions';




function Transactions() {
    const url = useContext(UrlContext);

    const [clientList, updateClientList] = useState([]);
    const [bucketList, updateBucketList] = useState([]);
    const [outBuckets, updateOutBuckets] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [returningBucket, setReturningBucket] = useState(null);
    const [weight, setBucketWeight] = useState(null)
    const [newBucket, setNewBucket] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setAddSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")

    async function startSubmit() {
        setError(false)

        if((!selectedClient.length || !returningBucket.bucket_id || !newBucket.length || weight === null || !weight.length)) {
            setErrorMessage("Please fill out all of the categories to continue")
            setError(true)
        }
        if(typeof(parseInt(weight)) !== 'number'){
            setErrorMessage("Robert, that's not a number. Try again.")
            setError(true)
        }
        else {

            if (returningBucket.bucket_id === newBucket[0].id) {
                console.log("same buckets dummy")
                setErrorMessage("Robert, those are the same damn buckets dummy");
                setError(true)
            }
            else {
                const date = moment().format('YYYY-MM-DD HH:mm:ss')
                const selectedId = selectedClient[0].id;
                const returningId = returningBucket.bucket_id;
                const newBucketId = newBucket[0].id;
                const result = await addTransaction({selectedId, returningId, newBucketId, date, weight}, url)
                console.log(result);
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
                const {availableBuckets, clientResults, outBuckets} = res;
                console.log(outBuckets);
                
                clientResults.forEach((client) => {
                  const newFormat = {id: client.client_id, label: `${client.first_name} ${client.last_name}`}
                  newClientFormat.push(newFormat)
                })

                availableBuckets.forEach((bucket) => {
                  const newFormat = {id: bucket.bucket_id, label: bucket.bucket_name}
                  newBucketFormat.push(newFormat)
                })
                updateBucketList(newBucketFormat);
                updateClientList(newClientFormat);
                updateOutBuckets(outBuckets);
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
            {bucketList.length && clientList.length && success === false ? 
                <Form.Group>
                    <Form.Label>Client Name</Form.Label>
                        <Typeahead 
                            id="clients"
                            label="Name"
                            options={clientList}
                            onChange={(selected) => {
                                setSelectedClient(selected);
                                if(selected.length > 0) {
                                    findBucketOwner(selected[0].id, outBuckets, setReturningBucket)
                                }
                               
                            }}
                        />
                    {returningBucket !== null ? 
                        <div className="col mt-3 mb-5">
                            <h4>Returning Bucket: {returningBucket.bucket_name}</h4>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control size="lg" type="number" placeholder='Enter Weight' onChange={(e) => {setBucketWeight(e.target.value)}}  />   
                             
                        </div> :
                    null}
                    {(weight !== null && weight.length) ? 
                    <div>                    <Form.Label>New Bucket</Form.Label>
                        <Typeahead 
                            id="buckets"
                            label="Bucket"
                            options={bucketList}
                            onChange={(selected) => {
                                setNewBucket(selected)
                            }}
                        /> 
                        </div>: null}
                    <Button onClick={ ()=> startSubmit()} className="m-2">Submit</Button>
                </Form.Group>
                : null
            } 
        </div>
    )
}

export default Transactions;