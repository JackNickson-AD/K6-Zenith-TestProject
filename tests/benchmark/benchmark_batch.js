import { sleep } from 'k6';
import http from 'k6/http';
import { getConfig, getHeader } from '../../utils/utils.js';

let config = getConfig();

let baseUrl = config.baseUrl;
let availabilitySummary = config.endpoints.availabilitySummary;
let breakdownSummary = config.endpoints.breakdownSummary;

export const options = {
    discardResponseBodies: false,
    scenarios: {
        contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 10,
        maxDuration: '10m',
        },
    },
};

export default function test() {
    var res = http.batch([
        ['POST', `${baseUrl}${availabilitySummary}`, JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'availability_summary' } }],
        ['POST', `${baseUrl}${breakdownSummary}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'breakdown_summary' } }],
    ]);
    // checks and debugs need adding here!
    sleep(240); // sleep for 4 mins before starting next iteration
}