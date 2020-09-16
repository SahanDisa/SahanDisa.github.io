/**
 * Calculates GCD table.
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Array}       Calculated GCD array of numbers
 */
function getGCDTable(num1, num2) {
    let tableArray = []
    let temp
    let d = num1
    let d_prime = num2
    let s = 1
    let s_prime = 0
    let t = 0
    let t_prime = 1
    let q = Math.floor(d / d_prime)

    while (d_prime !== 0) {
        addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q)

        temp = d_prime
        d_prime = d - q * d_prime
        d = temp

        temp = s_prime
        s_prime = s - s_prime * q
        s = temp

        temp = t_prime
        t_prime = t - t_prime * q
        t = temp

        q = Math.floor(d / d_prime)
    }
    addCurrentRowToArray(tableArray, d, d_prime, s, s_prime, t, t_prime, q)
    return tableArray
}

/**
 * Creates a new TableRow.
 * @class
 */
class TableRow {
    constructor(d, d_prime, s, s_prime, t, t_prime, q) {
        this.d = d
        this.d_prime = d_prime
        this.s = s
        this.s_prime = s_prime
        this.t = t
        this.t_prime = t_prime
        this.q = q
    }
}

/**
 * Adds new TableRow object to the array.
 * @param {Array}   array   GCD array
 * @param {Number}  d
 * @param {Number}  d_prime
 * @param {Number}  s
 * @param {Number}  s_prime
 * @param {Number}  t
 * @param {Number}  t_prime
 * @param {Number}  q
 */
function addCurrentRowToArray(array, d, d_prime, s, s_prime, t, t_prime, q) {
    const currentRow = new TableRow(d, d_prime, s, s_prime, t, t_prime, q)
    array.push(currentRow)
}