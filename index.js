import Dygraph from 'dygraphs';

const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const clearBtn = document.querySelector('#clearBtn');
const data = [...Array(1000)].map((val, idx) => [idx + 1, null, null, null, null, null, null]);
let g;
let intervalId;

const update = () => {
  // eslint-disable-next-line no-underscore-dangle
  const rows = g.file_.slice().reverse();
  const rowIdx = rows.findIndex(list => !list[1]);
  const updated = [
    ...rows.slice(0, rowIdx),
    [
      rows[rowIdx][0],
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ],
    ...rows.slice(rowIdx + 1),
  ].reverse();
  g.updateOptions({ file: updated });
};

const startUpdate = () => {
  intervalId = setInterval(update, 100);
};

const stopUpdate = () => {
  clearInterval(intervalId);
};

const clearChart = () => {
  g.updateOptions({ file: data });
};

startBtn.addEventListener('click', startUpdate);

stopBtn.addEventListener('click', stopUpdate);

clearBtn.addEventListener('click', clearChart);

window.onload = () => {
  const container = document.querySelector('#container');
  g = new Dygraph(container, data, {
    labels: ['NO', 'Y_1', 'Y_2', 'Y_3', 'Y_4', 'Y_5', 'Y_6'],
    width: 900,
    height: 400,
    valueRange: [0.0, 1.1],
    xRangePad: 2.4,
  });
};
