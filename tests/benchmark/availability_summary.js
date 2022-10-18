import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import { set_request_header, response_status_check, login_and_generate_authtoken, getconfig, getAuthToken, getHeader, getcredentials,  } from '../../utils/utils.js';

export default function availability_summary() { // add default as "export default function" to run test in isolation

  let config = getconfig();

  // Declare URL variables using config file
  let baseUrl = config.baseUrl;
  let availabilitySummary = config.endpoints.availabilitySummary;
  let breakdownSummary = config.endpoints.breakdownSummary;

  // Post
  const res = http.post(`${baseUrl}${availabilitySummary}` , JSON.stringify({}), params);

  // Log Response Code
  //console.log("Status Code: " + res.status ); 

  sleep(randomIntBetween(2,5)); // Think time 
}
