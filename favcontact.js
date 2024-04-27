const API_URL1="http://localhost:5000/user"  // Local JSON server url running at port 3000 run the server by 'npx json-server -p 3000 db.json'

//Fill the table with contact detils from json file
documentt.getElementById("getbtn1").addEventListener("click", async function(){
    alert("Favourite contact details is fetched from json file")
    const data = await getdata();
    data.forEach(function(e){
        const newrow = `<tr id="${e.id}">
                        <td>${e.id}</td>
                        <td>${e.name}</td>
                        <td>${e.email}</td>
                        <td>${e.phone}</td>
                        <td>${e.addr}</td>
                        <td><button class="btn" id="b${e.id}" onclick="deletedata('${e.id}')">REMOVE</button>
                    <tr>`;
        table.innerHTML += newrow;
    });
});
// fetching the data from json file
async function getdata(){
    try {
       
        const response = await fetch(API_URL1, {
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
        const response = await fetch(`${API_URL1}/${id}`,{ // The url of the json server is constructed again using the id that of the user wanted to be deleted 

            method:"DELETE"
        })
        alert("This contact details is removed form file");
        const btn1 = document.getElementById('b'+id);
        btn1.style.backgroundColor="green";
        btn1.style.borderColor="green";
        btn1.innerHTML="REMOVED";
        //event.target.parentElement.remove();


    }catch(err){
        console.log(err);
    }
}
