import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router"
import { Input, Typeahead } from 'react-bootstrap-typeahead'
import Form from 'react-bootstrap/Form';

import { giveBucket, submitBucket } from "../library/assaignBucket";
import { UrlContext } from '../context/urlContext';


function AssignBucket  ()  {

const url = useContext(UrlContext)

const [user, setUser] = useState("");
const [availableBuckets, setAvailableBuckets] = useState([]);
const [newBucket, setNewBucket] = useState("");
const [success, setSuccess] = useState(false);


async function startList () {
    const results =   await giveBucket(params.id, url);
    await setUser(`${results.user.first_name} ${results.user.last_name}`);
    const newBucketFormat = []
    results.availableBuckets.forEach((bucket) => {
        const newFormat = {id: bucket.bucket_id, label: bucket.bucket_name}
        newBucketFormat.push(newFormat)
      })
    await setAvailableBuckets(newBucketFormat); //
}
  const params = useParams();
  useEffect(() => {
    startList();

  }, [])


  return(
    <div className="container p-3 text-center">
        {success ? 
            <div>
                <h1>Bucket successfully assigned!</h1>
            </div>: 
            null
        }
        {
            availableBuckets.length && user.length ? 
            <div>
                <h2>Assign bucket to {user}</h2>
                <div>     
                    <Form.Group>
                        <Form.Label>Bucket</Form.Label>
                        <Typeahead 
                            id="buckets"
                            label="Bucket"
                            options={availableBuckets}
                            onChange={(selected) => {
                             setNewBucket(selected)
                         }}
                            />   
                    </Form.Group>               
                    <button className="btn btn-primary my-5" onClick={() => {
                        submitBucket(newBucket, params.id, url, setSuccess)
                    }}>Assign bucket</button>        
                </div>
            </div>: 
            <div>
                unloaded
            </div>
        }
    </div>
  )
}

export default AssignBucket;