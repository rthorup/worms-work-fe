import moment from "moment";

async function giveBucket(id, url){
    const result = await fetch(`${url}/assign-bucket`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "client_id": id,
        })
    })
    const response = await result.json();
    console.log(response)
    return response;
}

async function submitBucket (bucket, client_id, url, setSuccess){
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(bucket[0].id);

    const result = await fetch(`${url}/give-bucket`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "client_id": client_id,
            "bucket_id": bucket[0].id
        })
    })
    const response = await result.json();
    if(response.status === "success"){
        setSuccess(true)
    }
    else{
        console.log("error: " + response)
    }
}

export { giveBucket, submitBucket};