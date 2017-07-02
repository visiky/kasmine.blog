// app.js
import gondorffNumber from './gondorff.js'
import * as dataSource from './dataSource.js'
function emitGondorff(products) {
    function line(product) {
        return [
            `  <tr>`,
            `    <td>${product}</td>`,
            `    <td>${gondorffNumber(product, dataSource.salesDataFor, dataSource.recordCounts).toFixed(2)}</td>`,
            `  </tr>`].join('\n');
    }
    return encodeForHtml(`<table>\n${products.map(line).join('\n')}\n</table>`);
}


// gondorff.js
export default function gondorffNumber(product, salesDataFor, recordCounts) {
    return salesDataFor(product, gondorffEpoch(product, recordCounts), hookerExpiry())
        .find(r => r.date.match(/01$/))
        .quantity * Math.PI
        ;
}
function gondorffEpoch(product, recordCounts) {
    const countingBase = recordCounts(baselineRange(product));
    return deriveEpoch(countingBase);
}


// dataSource.js
export function salesDataFor(product, start, end) {
    return salesData(filename)
        .filter(r =>
            (r.product === product)
            && (new Date(r.date) >= start)
            && (new Date(r.date) < end)
        );
}
export function recordCounts(start) {
    return salesData(filename)
        .filter(r => new Date(r.date) >= start)
        .length
}