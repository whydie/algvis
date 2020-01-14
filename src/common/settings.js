const CHART_SETTINGS = {
  width: 600,
  height: 500,
  barPadding: 5,
  barMult: 5
};


const PLAYER_SETTINGS = {
  time: 1000,
  speed: 5
};

const ARR_LENGTH = 20;

const DEFAULT_ALGS = {
  "Bubble Sort": `let N = arr.length;
let swapped;
do {
  swapped = false;
  // visualize {
  tracer.select(N - 1);
  tracer.delay(arr);
  // }
  for (let i = 1; i < N; i++) {
    // visualize {
    tracer.select(i);
    tracer.delay(arr);
    // }
    if (arr[i - 1] > arr[i]) {
      const temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;
      swapped = true;
      // visualize {
      tracer.patch(i - 1, arr[i - 1]);
      tracer.patch(i, arr[i]);
      tracer.delay(arr);
      tracer.depatch(i - 1);
      tracer.depatch(i);
      // }
    }
    // visualize {
    tracer.deselect(i);
    // }
  }
  
  // visualize {
  tracer.deselect(N - 1);
  // }
  N--;
} while (swapped);`,

  "Insertion Sort": "",

  "Quick Sort": ""
}
const DEFAULT_ALG = "Bubble Sort";

export { CHART_SETTINGS, ARR_LENGTH, PLAYER_SETTINGS, DEFAULT_ALGS, DEFAULT_ALG };
