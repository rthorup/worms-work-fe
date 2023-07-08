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
    const {selectedId, returningId, newBucketId, date}= formData;
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
            "date": date

        })
    })
    const response = await result.json();
    return response;
}

export {getCurrentList, addTransaction}