


function verifyForm (formData) {
    const {firstName, lastName, address, email, phoneNumber, location} = formData; 

    if((firstName || lastName || address || email || phoneNumber) === "") {
        return({status: "error", message: "One or more neccessary fields are not filled out. Please enter all the data."})
    }
    else {
        return({status: "verified"})
    }
}


async function addClient(formData, url) {
    console.log(url)
    const {firstName, lastName, address, phoneNumber, email, location} = formData;
    const result = await fetch(`${url}/add-client`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "address": address, 
            "phone_number": phoneNumber,
            "email": email,
            "location": location
        })
    })
    const response = await result.json();
    console.log(response)
    return response;
}


export {addClient, verifyForm}