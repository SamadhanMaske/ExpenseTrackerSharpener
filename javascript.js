function validateForm()
{
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;

    if(amount=="" || category=="" || description=="" || date=="")
    {
        alert("Please enter all the details");
        return false;
    }

    if(amount<=0)
    {
        alert("Please enter valid amount");
        return false;
    }

    return true;

}

function clearFields()
{
    document.getElementById("amount").value="";
    document.getElementById("category").value="";
    document.getElementById("description").value="";
    document.getElementById("date").value="";
}

function showData()
{
    let expenseList = JSON.parse(localStorage.getItem("expenseList"));

    let html = "";
    expenseList.forEach((element,index) => 
    {
        html+="<tr>";
        html+="<td>"+element.amount+"</td>";   
        html+="<td>"+element.category+"</td>";   
        html+="<td>"+element.description+"</td>";   
        html+="<td>"+element.date+"</td>";
        
        html+= '<td><button onclick="deleteData('+index+
            ')" class="btn btn-danger">Delete</button><button onclick="updateData('+index+
            ')" class="btn btn-warning m-2">Update</button></td>';
        html+="</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//Load all data when page is reloaded
document.onload = showData();

function addData()
{
    if(validateForm()==true)
    {
        let amount = document.getElementById("amount").value;
        let category = document.getElementById("category").value;
        let description = document.getElementById("description").value;
        let date = document.getElementById("date").value;
 
        let expenseList;
        if(localStorage.getItem("expenseList")==null)
        {
            expenseList = [];
        }
        else
        {
            expenseList = JSON.parse(localStorage.getItem("expenseList"));
        }

        expenseList.push({amount:amount, category:category, description:description, date:date});

        localStorage.setItem("expenseList", JSON.stringify(expenseList));
        showData();
        clearFields();
    }
} 

function deleteData(index)
{
    let expenseList = JSON.parse(localStorage.getItem("expenseList"));

    expenseList.splice(index,1);
    localStorage.setItem("expenseList", JSON.stringify(expenseList)); 

    showData();
}

function updateData(index)
{
    //Submit button will hide and update button will be displayed
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let expenseList = JSON.parse(localStorage.getItem("expenseList"));

    document.getElementById("amount").value = expenseList[index].amount;
    document.getElementById("category").value = expenseList[index].category;
    document.getElementById("description").value = expenseList[index].description;
    document.getElementById("date").value = expenseList[index].date;

    document.querySelector("#update").onclick = function(){
        if(validateForm()==true)
        {
            expenseList[index].amount = document.getElementById("amount").value;
            expenseList[index].category = document.getElementById("category").value;
            expenseList[index].description = document.getElementById("description").value;
            expenseList[index].date = document.getElementById("date").value;

            localStorage.setItem("expenseList", JSON.stringify(expenseList)); 
            showData();
            clearFields();
            
            //Update button will hide and submit button will be displayed
            document.getElementById("update").style.display = "none";
            document.getElementById("submit").style.display = "block";
        }
    }

}