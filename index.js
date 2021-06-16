const { performance } = require('perf_hooks');

const resultsArr = []

async function main({
  iterations,
  functionUnderTest,
  parameters = [],
}) {
  for (let index = 0; index < iterations; index++) {
    const t0 = performance.now()
    await functionUnderTest(...parameters)
    const t1 = performance.now()
    const runTime = +(t1 - t0)
    resultsArr.push(runTime)
  }

  const avg = resultsArr.reduce((accumulator, value) => accumulator + value, 0) / iterations
  return avg
}

module.exports = main
