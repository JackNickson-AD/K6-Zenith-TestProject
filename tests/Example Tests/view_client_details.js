import { check, sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { get_random_client_id, response_status_check } from '../utils/utils.js'
import http from 'k6/http';

export let options = { // Configuration of the test is held in options https://k6.io/docs/using-k6/options/
    vus: 1,
    iterations: 1,
    thresholds:{
      http_req_failed: ['rate<0.01'],   // Http errors should be less than 1%
      http_req_duration: ['p(90)<200'], // 90% of requests should be below 200ms
    }
};

const base_url = "https://localhost:44398/"

export function view_client_details() {
    var clients = http.get(base_url + '/api/client');
    response_status_check(clients)
    var clientId = get_random_client_id(clients);

    let dashboard = http.batch([ // following calls are made in parallel to simulate a user going to view client details
        ['GET', base_url + '/api/client/' + clientId, null, ],
        ['GET', base_url + '/api/address/' + clientId, null, ],
        ['GET', base_url + '/api/car/' + clientId, null, ],
    ]);

    for (var response in dashboard) {
        check(dashboard[response], {
            "status was 200": r => dashboard[response].status === 200
        });
    }

    sleep(randomIntBetween(1, 5)); // pacing
}