import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import http from 'k6/http';
import { response_status_check, get_random_car } from '../utils/utils.js';

export let options = { // Configuration of the test is held in options https://k6.io/docs/using-k6/options/
    vus: 1,
    iterations: 1,
    thresholds:{
      http_req_failed: ['rate<0.01'],   // Http errors should be less than 1%
      http_req_duration: ['p(90)<200'], // 90% of requests should be below 200ms
    }
};

const base_url = "http://localhost:8081"

export function delete_client_car() { // add default as "export default function" to run test in isolation
    let car = http.get(base_url + '/api/car');
    response_status_check(car);
    let car_client = get_random_car(car);

    let car_del = http.del(base_url + '/api/car/' + car_client["clientId"] + '/' + car_client["carId"])
    response_status_check(car_del);

    sleep(randomIntBetween(30,40)); // pacing
}