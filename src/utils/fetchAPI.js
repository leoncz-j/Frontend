export default {
  postData: async (url = '', data = {}, adb2cToken = '') => {

    let sendDate = (new Date()).getTime();

    //Different API keys for old and new Api
    let ApiOcp = "";
    if (url.includes("apim-checkdenfakt-prod-we-001")){
      ApiOcp = "982ddb93986741a596d85db30707f91d";
    }
    else if (url.includes("we-checkdenfakt-apimgm.azure-api.net")){
      ApiOcp = "67a029cf86da4384b2b511f577163d72";
    }

    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Ocp-Apim-Subscription-Key' : ApiOcp,
        'Authorization' : adb2cToken, 
        'Content-Type': 'application/json'
      },
      timeout: 40000,
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let res = null;
    try {
      res = await response.json();
    } catch {
      console.error("Failed to consume body or parse json response for api", url)
    }
    if (res.statusCode){
      console.error(res, url)
    }

    
    let receiveDate = (new Date()).getTime();
    let responseTimeMs = receiveDate - sendDate;
    console.log("Api: ",url, "Response time: ", responseTimeMs,"ms");
    return res; // parses JSON response into native JavaScript objects
  },
  postMultiData: async (url = '', postData = {}) => {
    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
      }
    }

    const formData = new FormData();

    buildFormData(formData, postData)

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData // body data type must match "Content-Type" header
    });
    if (response === undefined) return response;
    return await response.json(); // parses JSON response into native JavaScript objects
  },
  getData: async (url = '', token = '') => {
    let headers = {};
    if(token){
      headers = {
        'Ocp-Apim-Subscription-Key' : "982ddb93986741a596d85db30707f91d",
        'Authorization' : token,
        'Content-Type': 'application/json',
      };
    }

    console.log(headers)
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    let res = null;
    try {
      res = await response.json();
    } catch (e) {
      if( response.status === 205) {
        res = null;
      } else {
        throw(e);
      }
    }
    return res;
  }


}
