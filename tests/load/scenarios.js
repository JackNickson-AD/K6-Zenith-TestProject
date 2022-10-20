import http from 'k6/http';
import { check, fail } from 'k6';
import { set_request_header, response_status_check, login_and_generate_authtoken, getconfig, getAuthToken, getHeader, getcredentials, getConfig,  } from '../../utils/utils.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


let config = getConfig();

// Declare URL variables using config file
let baseUrl = config.baseUrl;
let availabilitySummary = config.endpoints.availabilitySummary;
let breakdownSummary = config.endpoints.breakdownSummary;


export let options = {
    scenarios: {
        availability_summary: {
            executor: 'ramping-vus', // Executor type is dependent on the scenario https://k6.io/docs/using-k6/scenarios/executors/
            stages: [
                { duration: '15s', target: 15 },
                { duration: '15s', target: 15 },
                { duration: '15s', target: 0 },
            ],
            tags: { test: 'availability_summary' }, // extra tags for the metrics generated by this scenario
            exec: 'availability_summary', // the function this scenario will execute
        },
        breakdown_summary: {
            executor: 'ramping-vus', // Executor type is dependent on the scenario https://k6.io/docs/using-k6/scenarios/executors/
            stages: [
                { duration: '15s', target: 15 },
                { duration: '15s', target: 15 },
                { duration: '15s', target: 0 },
            ],
            tags: { test: 'breakdown_summary' }, // extra tags for the metrics generated by this scenario
            exec: 'breakdown_summary', // the function this scenario will execute
        }
    },
    thresholds: { // Each scenario can have its own thresholds
        'http_req_duration': ['p(20)<800', 'p(20)<800'],
        'http_req_failed': ['rate<0.5'],
    }
};

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send results to external location
  /*
    const res = http.post('https://[enter-url-here]', JSON.stringify(data));
    if (res.status != 200) {
      console.error('Could not send summary, got status ' + res.status);
    }
*/

  return { "summary.html" : htmlReport(data)}
}


  export function homepage() { // add default as "export default function" to run test in isolation
    // Post
    const res = http.post(`${baseUrl}${availabilitySummary}`, JSON.stringify({}), getHeader());
  
    // Log Response Code
    //console.log("Status Code: " + res.status ); 
  
    sleep(randomIntBetween(2,5)); // Think time 
  }
  
  