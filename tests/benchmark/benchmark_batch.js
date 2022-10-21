import { sleep } from 'k6';
import http from 'k6/http';
import { getConfig, getHeader } from '../../utils/utils.js';

let config = getConfig();

let baseUrl = config.baseUrl;
let availabilitySummary = config.endpoints.availabilitySummary;
let breakdownSummary = config.endpoints.breakdownSummary;
let defectSummary = config.endpoints.defectSummary;
let motByYearAndWeek = config.endpoints.motByYearAndWeek;
let inspectionByYearAndWeek = config.endpoints.inspectionByYearAndWeek;
let inspectionsForWeek = config.endpoints.inspectionsForWeek;
let invoiceForMonthSummary = config.endpoints.invoiceForMonthSummary;
let rechargeByYearAndWeek = config.endpoints.rechargeByYearAndWeek;

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
        ['POST', `${baseUrl}${defectSummary}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'defect_summary' } }],
        ['POST', `${baseUrl}${motByYearAndWeek}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'mot_by_year_and_week' } }],
        ['POST', `${baseUrl}${inspectionByYearAndWeek}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'inspection_by_year_and_week' } }],
        ['POST', `${baseUrl}${inspectionsForWeek}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'inspections_for_week' } }],
        ['POST', `${baseUrl}${invoiceForMonthSummary}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'invoice_for_month_summary' } }],
        ['POST', `${baseUrl}${rechargeByYearAndWeek}`, JSON.stringify({}), getHeader(),{ tags: { my_custom_tag: 'recharge_by_year_and_week' } }]
    ]);
    // checks and debugs need adding here!
    sleep(240); // sleep for 4 mins before starting next iteration
}