import { performanceTestHelper } from '../src';

describe('performanceTestHelper', () => {
  it('can test the average for a synchronous function', async () => {
    const fnToTest = (a: number[]): number => a.reduce((a: number, b: number): number => a + b, 0);
    const average = await performanceTestHelper({
      iterations: 10, 
      functionUnderTest: fnToTest,
      parameters: [[1, 2, 3, 4, 5]] 
    });
    expect(typeof average).toEqual('number');
    const [integer, decimal] = average.toString().split('.');
    expect(integer.length).toEqual(1);
    expect(decimal.length).toEqual(4);
  })
})
