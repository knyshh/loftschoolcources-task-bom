var table,
    cookies = {};
var cookiesArr = []; // array of the {name,value}

//set cookie
document.cookie = "SiteCookies=Yes3";
document.cookie = "alinasCookies=Yes2";
document.cookie = "linasCookies=Yes";

//create empty 3 col table
function createTable(){
    table = document.createElement('table');
    table.innerHTML = ' \
            <tr> \
                <th>Name Cookie</th><th>Cookie Value </th><th></th> \
            </tr> \
            ';
    document.body.appendChild(table);

    //get cookie and set row
    var cookies = getCookie() || console.log('There are no cookies');
    cookies.forEach(setToTable);
}
function fillNew(name,value){
    var row = document.createElement('tr');
    row.classList.add('row');
    row.innerHTML = ' \
      <td id="name">' + name + '</td> \
      <td id="value">' + value + '</td> \
       <td id="delete"><button data-namecookie="' + name + '">Delete cookies</button></td> \
      ';
    table.appendChild(row);
}
//write cookie in row
function setToTable(cookies) {
    var row = document.createElement('tr');
    row.classList.add('row')
    row.innerHTML = ' \
      <td id="name">' + cookies['name'] + '</td> \
      <td id="value">' + cookies['value'] + '</td> \
       <td id="delete"><button data-namecookie="' + cookies['name'] + '">Delete cookies</button></td> \
      ';
    table.appendChild(row);
};

//get cookie and write to the object with key name and  value /  and pushin obj to the array allCookie
function getCookie(){
    if(!document.cookie) return;
    return document.cookie.split(';').map(item => {
        let tmp = item.split('=');
        return {
            name: tmp[0],
            value: tmp[1]
        }
    });
};

document.addEventListener('click', e => {
    let btn = e.target,
        cookieName = btn.getAttribute('data-namecookie');

    if( btn.tagName === 'BUTTON' ){
        deleteCookie = confirm('Delete cookie with name- ' + cookieName );
        if (deleteCookie){
            var date = new Date;
            date.setDate(date.getDate() - 1);
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
        }
    }
});

createTable();

document.body.addEventListener('click', addCookie);

function clearFields(){
    document.forms[0].nameCookie.value = document.forms[0].valueCookie.value = 	document.forms[0].expiresDateCookie.value = '';
}

function addCookie(e){
    e.preventDefault();
    let btnAdd = e.target;
    let name,value,dateInput,newDate;

    name = 	document.forms[0].nameCookie.value;
    value = document.forms[0].valueCookie.value;
    dateInput = document.forms[0].expiresDateCookie.value;

    date = new Date(); //set date
    date.setDate(date.getDate() + dateInput);
    newDate = date.toUTCString();

    if( btnAdd.getAttribute('id') === 'addCookie' ){
        if(name === "" || value === "" || date === ""  || typeof parseInt(date) != 'number') {
            alert('fill all fields');
            return;
        }
        else {
            document.cookie = name+'='+value+'; expires='+newDate;
            fillNew(name,value);
            clearFields();
        }
    }
}