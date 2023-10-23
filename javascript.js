
let apiUrl = "https://crudcrud.com/api/ecdc621fe32147fd8ad5afdaf8526258/Expenses";

function getData() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;

    let obj = { amount: amount, category: category, description: description, date: date }
    return obj;
}

function validateForm() {
    let inp = getData();
    if (inp.amount == "" || inp.category == "" || inp.description == "" || inp.date == "") {
        alert("Please enter all the details");
        return false;
    }
    if (inp.amount <= 0) {
        alert("Please enter valid amount");
        return false;
    }
    return true;
}

function clearFields() {
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
}

async function showData() {
    let res = await axios.get(apiUrl);
    let expenseList = res.data;
    console.log(expenseList);

    let html = "";
    expenseList.forEach((element, index) => {
        html += "<tr>";
        html += "<td>" + element.amount + "</td>";
        html += "<td>" + element.category + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td>" + element.date + "</td>";

        html += '<td><button onclick="updateData(' + index +
            ')" class="btn btn-warning m-2">Update</button><button onclick="deleteData(' + index +
            ')" class="btn btn-danger">Delete</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//Load all data when page is reloaded
document.onload = showData();

document.getElementById("submit").addEventListener("click", addData);

async function addData() {
    if (validateForm()) {
        let expense = getData();
        console.log(expense);
        await axios.post(apiUrl, expense)
            .then(function () {
                showData();
            })
            .then(function () {
                clearFields();
            });
    }
}

async function deleteData(index) {
    let res = await axios.get(apiUrl);
    let expenseList = res.data;
    let id = expenseList[index]._id;
    await axios.delete(apiUrl + "/" + id)
        .then(function () {
            showData();
        });
}

async function updateData(index) {
    //Submit button will hide and update button will be displayed
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let res = await axios.get(apiUrl);
    let expenseList = res.data;
    let id = expenseList[index]._id;
    document.getElementById("amount").value = expenseList[index].amount;
    document.getElementById("category").value = expenseList[index].category;
    document.getElementById("description").value = expenseList[index].description;
    document.getElementById("date").value = expenseList[index].date;

    document.querySelector("#update").onclick = async function () {
        if (validateForm() == true) {
            let ue = getData();  //updated enpence

            await axios.put(apiUrl + "/" + id, ue)
                .then(function () {
                    showData();
                })
                .then(function () {
                    clearFields();
                })
                .then(function () {
                    //Update button will hide and submit button will be displayed
                    document.getElementById("update").style.display = "none";
                    document.getElementById("submit").style.display = "block";
                });
        }
    }
}