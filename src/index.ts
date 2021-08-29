import { performance } from 'perf_hooks';

const resultsArr: number[] = []

interface ParamsInterface {
  iterations: number;
  functionUnderTest: (...args : any[]) => any;
  parameters?: any[];
}

export async function performanceTestHelper({
  iterations,
  functionUnderTest,
  parameters = [],
}: ParamsInterface): Promise<number> {
  for (let index = 0; index < iterations; index++) {
    const t0 = performance.now()
    await functionUnderTest.apply(null, parameters);
    const t1 = performance.now()
    const runTime = +(t1 - t0)
    resultsArr.push(runTime)
  }

  const avg = resultsArr
    .reduce((accumulator, value) => accumulator + value, 0) / iterations
  return avg;
}
