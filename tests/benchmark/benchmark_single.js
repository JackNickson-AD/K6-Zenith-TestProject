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
    var res = http.post(`${baseUrl}${availabilitySummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'availability_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${breakdownSummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'breakdown_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${defectSummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'defect_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${motByYearAndWeek}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'mot_by_year_and_week' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${inspectionByYearAndWeek}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'inspection_by_year_and_week' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${inspectionsForWeek}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'inspections_by_week' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${invoiceForMonthSummary}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'invoice_for_month_summary' } });
    sleep(10); // Think time
    // checks and debugs need adding here!

    res = http.post(`${baseUrl}${rechargeByYearAndWeek}` , JSON.stringify({}), getHeader(), { tags: { my_custom_tag: 'recharge_by_year_and_week' } });
    sleep(10); // Think time
    // checks and debugs need adding here!
}
