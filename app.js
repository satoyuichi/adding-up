'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });
const map = new Map(); // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', (lineString) => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const prefecture = columns[2];
  const popu = parseInt(columns[7]);
  if ((year === 2010) || (year === 2015)) {
    let value = map.get(prefecture);

    if (value === undefined) {
      value = { 
        p10: 0,
        p15: 0,
        change: null
      };
    }

    if (year === 2010) {
      value.p10 += popu;
    }

    if (year === 2015) {
      value.p15 += popu;
    }

    map.set(prefecture, value);
  }
});
rl.on ('close', () => {
  console.log (map);
})
rl.resume();
