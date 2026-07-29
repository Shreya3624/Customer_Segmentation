// ======================================
// CUSTOMERIQ
// customers_new.js
// ======================================

// ---------- Modal Elements ----------

const modal = document.getElementById("customerModal");

const openBtn = document.querySelector(".add-btn");

const closeBtn = document.getElementById("closeModal");

const cancelBtn = document.getElementById("cancelBtn");

const modalTitle = document.getElementById("modalTitle");

const customerForm = document.getElementById("customerForm");

// ---------- Inputs ----------

const customerID = document.getElementById("customer_id");
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const income = document.getElementById("income");
const score = document.getElementById("score");

// ======================================
// OPEN ADD CUSTOMER
// ======================================

openBtn.addEventListener("click", () => {

    modal.classList.add("active");

    modalTitle.innerHTML = "Add Customer";

    customerForm.action = "/add_customer";

    customerForm.reset();

    customerID.readOnly = false;

});

// ======================================
// CLOSE MODAL
// ======================================

function closeModal(){

    modal.classList.remove("active");

}

closeBtn.onclick = closeModal;

cancelBtn.onclick = closeModal;

// Click outside

window.onclick = function(e){

    if(e.target==modal){

        closeModal();

    }

}

// ======================================
// EDIT CUSTOMER
// ======================================

document.querySelectorAll(".edit").forEach(btn=>{

    btn.addEventListener("click",()=>{

        modal.classList.add("active");

        modalTitle.innerHTML="Edit Customer";

        customerForm.action="/update_customer";

        customerID.value=btn.dataset.id;
        customerID.readOnly=true;

        gender.value=btn.dataset.gender;

        age.value=btn.dataset.age;

        income.value=btn.dataset.income;

        score.value=btn.dataset.score;

    });

});

// ======================================
// DELETE CUSTOMER
// ======================================
let deleteID = null;

const deleteModal = document.getElementById("deleteModal");

const confirmDelete = document.getElementById("confirmDelete");

const cancelDelete = document.getElementById("cancelDelete");

document.querySelectorAll(".delete").forEach(btn=>{

    btn.onclick=()=>{

        deleteID=btn.dataset.id;

        deleteModal.classList.add("active");

    }

});

cancelDelete.onclick=()=>{

    deleteModal.classList.remove("active");

}

confirmDelete.onclick=()=>{

    window.location.href="/delete_customer/"+deleteID;

}

window.addEventListener("click",(e)=>{

    if(e.target==deleteModal){

        deleteModal.classList.remove("active");

    }

});
// ======================================
// SEARCH
// ======================================

const search=document.getElementById("tableSearch");

search.addEventListener("keyup",()=>{

    const value=search.value.toLowerCase();

    const rows=document.querySelectorAll("#customerTable tbody tr");

    rows.forEach(row=>{

        row.style.display=row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    });

});

// ======================================
// FILTERS
// ======================================

const genderFilter=document.getElementById("genderFilter");

const clusterFilter=document.getElementById("clusterFilter");

function filterTable(){

    const genderValue=genderFilter.value;

    const clusterValue=clusterFilter.value;

    const rows=document.querySelectorAll("#customerTable tbody tr");

    rows.forEach(row=>{

        const gender=row.cells[1].innerText.trim();

        const cluster=row.cells[5].innerText;

        let show=true;

        if(genderValue){

            if(genderValue=="M" && gender!="Male") show=false;

            if(genderValue=="F" && gender!="Female") show=false;

        }

        if(clusterValue){

            if(!cluster.includes(clusterValue)) show=false;

        }

        row.style.display=show ? "" : "none";

    });

}

genderFilter.addEventListener("change",filterTable);

clusterFilter.addEventListener("change",filterTable);

// ======================================
// TOAST NOTIFICATION
// ======================================

const toast = document.getElementById("toast");

const toastText = document.getElementById("toastText");

const toastIcon = document.getElementById("toastIcon");

const params = new URLSearchParams(window.location.search);

const success = params.get("success");

if(success){

    if(success=="added"){

        toastText.innerHTML="Customer Added Successfully";

        toast.style.borderLeft="6px solid #22C55E";

        toastIcon.className="fa-solid fa-circle-check";

        toastIcon.style.color="#22C55E";

    }

    if(success=="updated"){

        toastText.innerHTML="Customer Updated Successfully";

        toast.style.borderLeft="6px solid #3B82F6";

        toastIcon.className="fa-solid fa-pen";

        toastIcon.style.color="#3B82F6";

    }

    if(success=="deleted"){

        toastText.innerHTML="Customer Deleted Successfully";

        toast.style.borderLeft="6px solid #EF4444";

        toastIcon.className="fa-solid fa-trash";

        toastIcon.style.color="#EF4444";

    }

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

        history.replaceState({}, "", "/customers");

    },3000);

}