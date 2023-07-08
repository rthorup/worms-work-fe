


async function addBucket(formData, url) {
    const {bucketName} = formData;
    const result = await fetch(`${url}/add-bucket`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "bucket_name": bucketName,
            "bucket_owner": 5
  
        })
    })
    const response = await result.json();
    return response;
}


export {addBucket}