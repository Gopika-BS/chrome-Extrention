let myLeads =[]
let inputBtn = document.getElementById("input-btn")
let inputEl = document.getElementById("input-el" )
const ulEl =document.getElementById(id="ul-el")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
let deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//to get access the crome Api TABS


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
//functon to render// 
function render(leads) {
    var listItems = "";
    console.log(leads.length);
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


//to delete the  url

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
        render(myLeads)
})

// to tale the imput value to the myLeads

inputBtn.addEventListener("click",function(){
    let inputValue = inputEl.value;
    myLeads.push(inputValue)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
