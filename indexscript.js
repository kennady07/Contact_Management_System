const API_URL="http://localhost:3000/users"  // Local JSON server url running at port 3000 run the server by 'npx json-server -p 3000 db.json'

document.getElementById("form").addEventListener('submit',function(event){
    event.preventDefault();  
    const name=document.getElementById("fname").value;
    const phone=document.getElementById("phone").value;
    const email=document.getElementById("email").value;
    const address=document.getElementById("address").value;

    // validate the  name and phone number before posting to the json file

    if(!/^[a-zA-Z\s]+$/.test(name)){
        alert("Name should not contain digits!!!");
        return;
    }   //here name should not contain any digits and atleast one character.

    if(!/^[1-9]\d{9}$/.test(phone)){
        alert("Phone number should not start with 0 and it must be 10 digits");
        return; //here phone number 1st digit not equal to 0 and only 10 digits.
    }

    const formobj={
        name:`${name}`,
        email:`${email}`,
        phone:`${phone}`,
        addr:`${address}`
    }
    
    postformdata(formobj);  // Calling post function to post the form data at the json server. 
    document.getElementById("form").reset();
})

async function postformdata(formobj){
    try{
        const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "content-type":"Application/json"  // posting the data into json server so the content type is mentioned as json 
            },
            body:JSON.stringify(formobj)    // converting the object user into json using stringify method. the content inside the body will be posted at the server

        });
    }catch(err){
        console.log(err);
    }
}

