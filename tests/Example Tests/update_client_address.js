import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import { get_address_payload } from '../data/payloadData.js';
import { set_request_header, response_status_check, get_random_client_id } from '../utils/utils.js';

export let options = { // Configuration of the test is held in options https://k6.io/docs/using-k6/options/
    vus: 1,
    iterations: 1,
    thresholds:{
      http_req_failed: ['rate<0.01'],   // Http errors should be less than 1%
      http_req_duration: ['p(90)<200'], // 90% of requests should be below 200ms
    }
};

const base_url = "https://localhost:44398/"

export function update_client_address() { // add default as "export default function" to run test in isolation

    let clients = http.get(base_url + '/api/client');
    response_status_check(clients)
    let clientId = get_random_client_id(clients);
    let address_payload = get_address_payload(clientId);

    sleep(randomIntBetween(1,5));

    let address = http.put(base_url + '/api/address/' + clientId, JSON.stringify(address_payload), set_request_header());
    response_status_check(address)

    sleep(randomIntBetween(1,5));
}