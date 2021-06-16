const fs = require('fs')
const path = require('path')
const tester = require('./index')
const readline = require('readline')

function fnToTest() {
  const filePath = path.resolve(__dirname, './airports.csv')
  const fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const [headers] = fileData.split(/\r?\n/)
  return headers.split(',')
}

async function getFirstLine() {
  const filePath = path.resolve(__dirname, './airports.csv')
  const readable = fs.createReadStream(filePath);
  const reader = readline.createInterface({ input: readable });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      resolve(line);
      reader.close();
    });
  });
  readable.close();
  return line.split(',')
}

(async () => await tester({
  iterations: 100,
  functionUnderTest: fnToTest,
}))()

