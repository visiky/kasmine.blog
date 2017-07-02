// serviceLocator.js
export let salesDataFor;
export let recordCounts;
export let gondorffNumber;

export function initialize(arg) {
    salesDataFor: arg.salesDataFor;
    recordCounts: arg.recordCounts;
    gondorffNumber = arg.gondorffNumber;
}

// configureServices.js …
import * as locator from './serviceLocator.js ';
import gondorffImpl from './gondorff.js ';
import createDataSource from './dataSourceAdapter.js '

export default function () {
    const dataSource = createDataSource('sales.csv');
    locator.initialize({
        salesDataFor: dataSource.salesDataFor,
        recordCounts: dataSource.recordCounts,
        gondorffNumber: gondorffImpl
    });
}

// app.js
import { gondorffNumber } from './serviceLocator.js ';

function emitGondorff(products) {
    function line(product) {
        return [
            `  <tr>`,
            `    <td>${product}</td>`,
            `    <td>${gondorffNumber(product).toFixed(2)}</td>`,
            `  </tr>`].join('\n');
    }
    return encodeForHtml(`<table>\n${products.map(line).join('\n')}\n</table>`);
}


// gondorff.js
import { salesDataFor, recordCounts } from './serviceLocator.js '

export default function gondorffNumber(product) {
    return salesDataFor(product, gondorffEpoch(product, recordCounts), hookerExpiry())
        .find(r => r.date.match(/01$/))
        .quantity * Math.PI
        ;
}
function gondorffEpoch(product) {
    const countingBase = recordCounts(baselineRange(product));
    return deriveEpoch(countingBase);
}

// dataSource.js
export function salesDataFor(product, start, end, filename) {
    return salesData(filename)
        .filter(r =>
            (r.product === product)
            && (new Date(r.date) >= start)
            && (new Date(r.date) < end)
        );
}
export function recordCounts(start, filename) {
    return salesData(filename)
        .filter(r => new Date(r.date) >= start)
        .length
}

// dataSourceAdapter.js …
import * as ds from './dataSource.js'

export default function (filename) {
    return {
        salesDataFor(product, start, end) { return ds.salesDataFor(product, start, end, filename) },
        recordCounts(start) { return ds.recordCounts(start, filename) }
    }
}
