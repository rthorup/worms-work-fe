async function getCurrentList(url) {
    const result = await fetch(`${url}/generate-user-list`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const response = await result.json();
    return response;
}

async function addTransaction(formData, url) {
    const {selectedId, returningId, newBucketId, date, weight}= formData;
    const result = await fetch(`${url}/transactions`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "client_id": selectedId,
            "return_bucket" :returningId,
            "new_bucket": newBucketId,
            "date": date,
            "weight": weight
        })
    })
    const response = await result.json();
    return response;
}


function findBucketOwner(clientID, outBuckets, updateReturningBucket){
    let foundBucket = null;
    outBuckets.forEach((item) => {
        if(item.bucket_owner === clientID){
            foundBucket = item;
        }
    })
    if(foundBucket !== null){
        updateReturningBucket(foundBucket);
    }

}

export {getCurrentList, addTransaction, findBucketOwner}


