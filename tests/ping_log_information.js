import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import authToken from './scenarios.js'
import { set_request_header } from '../utils/utils.js';

const URL = 'https://localhost:7062/Ping/log/information';

export function ping_log_information() { // add default as "export default function" to run test in isolation
  const res = http.get(URL, JSON.stringify(authToken), set_request_header());
  //console.log("Status Code: " + res.status);
  sleep(randomIntBetween(2,5)); // think time
}

