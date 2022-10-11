import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import { set_request_header, login_and_generate_authtoken, get_credentials } from '../../utils/utils.js';

const credentials = get_credentials();


export function breakdown_summary() { // add default as "export default function" to run test in isolation
  
  // Generate Auth Token
  const token = login_and_generate_authtoken( credentials[0].USERNAME, credentials[0].PASSWORD )

  // Set Params
  const params = {
    headers: {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json'
    },
  };

  // Post
  //const res = http.post(, JSON.stringify({}), params);

  // Log Response Code
  //console.log("Status Code: " + res.status ); 

  sleep(randomIntBetween(2,5)); // Think time 
}
