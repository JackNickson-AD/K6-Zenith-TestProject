export { availability_summary } from '../benchmark/availability_summary.js';
export { breakdown_summary } from '../benchmark/breakdown_summary.js';
import http from 'k6/http';
import { set_request_header, response_status_check, login_and_generate_authtoken } from '../../utils/utils.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";




// Get config 
function getconfig() {
  try {
    return JSON.parse(open(__ENV.CONFIG));
  }
  catch (err) {
    throw new Error("Please set a config file using -e CONFIG=config/{appropriate-config-file}");
  }
}
let config = getconfig();

// Get Virtual User Credentials
function getcredentials() {
  try {
    return JSON.parse(open(__ENV.CREDENTIALS));
  }
  catch (err) {
    throw new Error("Please set a credentials file using -e CREDENTIALS=data/{appropriate-credentials-file}");
  }
}
let credentials = getcredentials();

// Generate Auth Token
function getAuthToken() {
  let creds = credentials[Math.floor(Math.random() * credentials.length)];
  return token = login_and_generate_authtoken( creds.username, creds.password )
}

// Set header and return as 'params'
function getHeader() {
  return params = {
      headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'content-type': 'application/json'
      },
  };
}

// Declare URL variables using config file
let baseUrl = config.baseUrl;
let availabilitySummary = config.endpoints.availabilitySummary;
let breakdownSummary = config.endpoints.breakdownSummary;


export let options = {
    scenarios: {
        homepage: {
            executor: 'ramping-vus', // Executor type is dependent on the scenario https://k6.io/docs/using-k6/scenarios/executors/
            stages: [
                { duration: '15s', target: 15 },
                { duration: '15s', target: 15 },
                { duration: '15s', target: 0 },
            ],
            tags: { test: 'homepage' }, // extra tags for the metrics generated by this scenario
            exec: 'homepage', // the function this scenario will execute
        },
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
    const responses = http.batch([
      ['POST', `${baseUrl}${availabilitySummary}`, JSON.stringify({}), getHeader(), { tags: { ctype: 'html' } }],
      ['POST', `${baseUrl}${breakdownSummary}`, JSON.stringify({}), getHeader(), { tags: { ctype: 'html' } }],
    ])

    check(responses[0], {
      'main page status was 200': (res) => res.status === 200,
    });
  
    sleep(randomIntBetween(2,5)); // Think time 
  }
  
  