console.log("test");

// Utility functions:
// 1. utility Function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initilize the params count veriable 
var addParamsCount = 0;

// Hide  Parameter Box initially
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

//if click on json in content type hide the parameter box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    // document.getElementById('params').style.display = 'none';
    document.getElementById('jsonBox').style.display = 'block';
});

//if click on params in content type hide the json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('jsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';   
    //  document.getElementById('params').style.display = 'block';

});

// if click on + button add more parameters
let addParams = document.getElementById('addParams')
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="input-group mb-3 ">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamsCount + 2}</label>
                        <div class="col-md-4 mx-1">
                            <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} key">
                        </div>
                        <div class="col-md-4 mx-1">
                            <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Enter Parameter ${addParamsCount + 2} value">
                        </div>
                        
                        <button class="btn btn-primary deleteParam">-</button>

                        
                   </div>`

    //conert string to Dom Element 
    let domElement = getElementFromString(string);
    params.appendChild(domElement);

    // add a event listner tto remove the parameter on clickinking on  - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.target.parentElement.remove();
        })
    }

    addParamsCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //Show pleasee wait in the response box to request patience from user
    document.getElementById('prismResponse').innerHTML = '<p>Please Wait... Fetching response...</p>';


    // fetch all the values taht user entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // if user choose params instead of json then collect all the parameters in object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
        
    }


    // console log the values for debugging
    console.log('url is ', url);
    console.log('RequestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('prismResponse').innerHTML = text;
                Prism.highlightAll();

            });
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('prismResponse').innerHTML = text;
                Prism.highlightAll();
            }); 
    }


})


