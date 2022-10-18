import { sleep } from 'k6';
import http from 'k6/http';
import { getConfig, getHeader } from '../../utils/utils.js';

let config = getConfig();

let baseUrl = config.baseUrl;
let availabilitySummary = config.endpoints.availabilitySummary;
let breakdownSummary = config.endpoints.breakdownSummary;

export const options = {
    discardResponseBodies: true,
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
    var res = http.post(`${baseUrl}${availabilitySummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'availability_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${breakdownSummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'breakdown_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!
}