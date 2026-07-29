// ================================
// CUSTOMER MODAL
// ================================

const modal = document.getElementById("customerModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

const form = document.getElementById("customerForm");
const modalTitle = document.getElementById("modalTitle");
const saveText = document.getElementById("saveText");

// Open Add Customer
openBtn.onclick = () => {

    modal.classList.add("active");

    modalTitle.innerHTML = "Add Customer";
    saveText.innerHTML = "Save Customer";

    form.action = "/add_customer";

    form.reset();

    document.getElementById("customer_id").readOnly = false;

};

// Close
closeBtn.onclick = () => modal.classList.remove("active");
cancelBtn.onclick = () => modal.classList.remove("active");

window.onclick = function(e){

    if(e.target == modal){

        modal.classList.remove("active");

    }

}


// ================================
// EDIT CUSTOMER
// ================================

document.querySelectorAll(".edit").forEach(button=>{

    button.addEventListener("click",function(){

        modal.classList.add("active");

        modalTitle.innerHTML="Edit Customer";

        saveText.innerHTML="Update Customer";

        form.action="/update_customer";

        document.getElementById("customer_id").value=this.dataset.id;
        document.getElementById("customer_id").readOnly=true;

        document.getElementById("gender").value=this.dataset.gender;
        document.getElementById("age").value=this.dataset.age;
        document.getElementById("income").value=this.dataset.income;
        document.getElementById("score").value=this.dataset.score;

    });

});


// ================================
// DELETE CUSTOMER
// ================================

const deleteModal=document.getElementById("deleteModal");
const confirmDelete=document.getElementById("confirmDelete");
const cancelDelete=document.getElementById("cancelDelete");

let deleteID=null;

document.querySelectorAll(".delete").forEach(button=>{

    button.addEventListener("click",function(){

        deleteID=this.dataset.id;

        deleteModal.style.display="flex";

    });

});

cancelDelete.onclick=function(){

    deleteModal.style.display="none";

}

confirmDelete.onclick=function(){

    window.location.href="/delete_customer/"+deleteID;

}


// ================================
// SEARCH
// ================================

const search=document.getElementById("tableSearch");

search.addEventListener("keyup",function(){

    let value=this.value.toLowerCase();

    let rows=document.querySelectorAll("#customerTable tbody tr");

    rows.forEach(row=>{

        row.style.display=row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    });

});


// ================================
// FILTERS
// ================================

const genderFilter=document.getElementById("genderTableFilter");
const clusterFilter=document.getElementById("clusterTableFilter");

genderFilter.addEventListener("change",filterTable);
clusterFilter.addEventListener("change",filterTable);

function filterTable(){

    const gender=genderFilter.value;
    const cluster=clusterFilter.value;

    const rows=document.querySelectorAll("#customerTable tbody tr");

    rows.forEach(row=>{

        const rowGender=row.cells[1].innerText.trim();

        const rowCluster=row.cells[5].innerText;

        let genderMatch=true;
        let clusterMatch=true;

        if(gender!=""){

            genderMatch=rowGender.includes(
                gender=="M" ? "Male":"Female"
            );

        }

        if(cluster!=""){

            clusterMatch=rowCluster.includes(cluster);

        }

        row.style.display=(genderMatch && clusterMatch)
        ? ""
        : "none";

    });

}