const API_URL = "http://localhost:3000/users";  // Local JSON server url running at port 3000 run the server by 'npx json-server -p 3000 db.json'

//Fill the table with contact detils from json file
document.getElementById("getbtn1").addEventListener("click", async function(){
    alert("Contact details is fetched from json file");
    const data = await getdata();
    data.forEach(function(e){
        const newrow = `<tr id="${e.id}">
                        <td>${e.id}</td>
                        <td class="name">${e.name}</td>
                        <td class="email">${e.email}</td>
                        <td class="phone">${e.phone}</td>
                        <td class="address">${e.addr}</td>
                        <td><button class="btn23" id="btn" onclick="editdata('${e.id}','${e.name}','${e.email}','${e.phone}','${e.addr}')">EDIT</button>&nbsp;<button  class="btn23" id="btn" onclick="deletedata('${e.id}')">DELETE</button>&nbsp;<button id="b${e.id}" class="btn23" onclick="favdata('${e.id}','${e.name}','${e.email}','${e.phone}','${e.addr}')">FAVORITE</button></td>
                    <tr>`;
        table.innerHTML += newrow;
    });
});

// fetching the data from json file
async function getdata(){
    try {
       
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Accept": "Application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}


//delete the contact detail using id of the respective contact.
async function deletedata(id){
    try{
        const response = await fetch(`${API_URL}/${id}`,{ // The url of the json server is constructed again using the id that of the user wanted to be deleted 

            method:"DELETE"
        })
        
        alert("This contact details is removed form file");
        const row=document.getElementById(id);
        row.remove();

    }catch(err){
        console.log(err);
    }
}



async function editdata(id, name, email, phone, address) {
    const form = document.getElementById("form");
    form.style.display = "block";
    const mytable = document.getElementById("table");
    mytable.style.display = "none";

    const myname = document.getElementById("fname");
    const myphone = document.getElementById("phone");
    const myemail = document.getElementById("email");
    const myaddress = document.getElementById("address");

    myname.value = name;
    myemail.value = email;
    myphone.value = phone;
    myaddress.value = address;

    document.getElementById("uptbtn").addEventListener("click", function (event) {
        event.preventDefault();

        const myname1 = document.getElementById("fname").value;
        const myphone1 = document.getElementById("phone").value;
        const myemail1 = document.getElementById("email").value;
        const myaddress1 = document.getElementById("address").value;

        const row = document.getElementById(id);
        row.querySelector(".name").innerText = myname1;
        row.querySelector(".email").innerText = myemail1;
        row.querySelector(".phone").innerText = myphone1;
        row.querySelector(".address").innerText = myaddress1;

        const editobj = {
            name: myname1,
            email: myemail1,
            phone: myphone1,
            addr: myaddress1
        };
        handle_editdata(editobj, id);
        form.style.display = "none";
        mytable.style.display = "block";
    });
}

async function handle_editdata(user, id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(user)
        });
    } catch (err) {
        console.log(err);
    }
}



// add to the favorite contact list page

function favdata (id,name,email,phone,address){
    alert("This contact details added to favorite contact files !!!!");
    
    const formobj={
        id:id,
        name:name,
        email:email,
        phone:phone,
        addr:address
    }
    postfavdata(formobj);
    const favbtn = document.getElementById("b"+id);
    favbtn.style.backgroundColor = "green";
    favbtn.style.borderColor="green";
    favbtn.innerHTML="ADDED";
    favbtn.removeAttribute("onclick");
    
}

const API_URL1="http://localhost:5000/user"

async function postfavdata(formobj){
    try{
       
        const response = await fetch(API_URL1,{
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





