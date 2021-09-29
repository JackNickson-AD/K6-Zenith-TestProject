import { check, sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import { set_request_header, response_status_check } from '../utils/utils.js';
import { get_address_payload, get_car_payload, get_client_payload } from '../data/payloadData.js';

export let options = { // Configuration of the test is held in options https://k6.io/docs/using-k6/options/
    vus: 1,
    iterations: 1,
    thresholds:{
      http_req_failed: ['rate<0.01'],   // Http errors should be less than 1%
      http_req_duration: ['p(90)<200'], // 90% of requests should be below 200ms
    }
};

const base_url = "http://localhost:8081"

export function create_client_address_car() { // add default as "export default function" to run test in isolation

    let client_payload = get_client_payload() // selects a random client

    let res = http.post(base_url + '/api/client', JSON.stringify(client_payload), set_request_header());
    response_status_check(res);
    let clientId = res.json()["id"]
    sleep(randomIntBetween(1,5)); // think time

    let car_payload = get_car_payload(clientId)
    res = http.post(base_url + '/api/car', JSON.stringify(car_payload), set_request_header());
    response_status_check(res);
    sleep(randomIntBetween(1,5)); // think time

    let address_payload = get_address_payload(clientId)
    res = http.post(base_url + '/api/address', JSON.stringify(address_payload), set_request_header());
    response_status_check(res);
    sleep(randomIntBetween(1,5)); // pacing
}

