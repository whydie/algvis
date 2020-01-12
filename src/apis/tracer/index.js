class Element {
  constructor(value, patched = false, selected = false) {
    this.value = value;
    this.patched = patched;
    this.selected = selected;
  }
}

class Array1DTracer {
  constructor(arr, x = 0) {
    this.unsortedArr = Array.from(arr, i => new Element(i));
    this.steps = [
      this.unsortedArr,
      Array.from(
        this.unsortedArr,
        i => new Element(i.value, i.patched, i.selected)
      )
    ];
    this.currentStepIndex = x + 1;
  }

  patch(x, v = this.steps[this.currentStepIndex][x].value) {
    this.steps[this.currentStepIndex][x].value = v;
    this.steps[this.currentStepIndex][x].patched = true;
  }

  depatch(x) {
    this.steps[this.currentStepIndex][x].patched = false;
  }

  select(sx, ex = sx) {
    for (let x = sx; x <= ex; x++) {
      this.steps[this.currentStepIndex][x].selected = true;
    }
  }

  deselect(sx, ex = sx) {
    for (let x = sx; x <= ex; x++) {
      this.steps[this.currentStepIndex][x].selected = false;
    }
  }

  set(arr) {
    for (let x = 0; x < arr.length; x++) {
      this.steps[this.currentStepIndex][x].value = arr[x];
    }
  }

  delay(newArr) {
    this.set(newArr);
    this.steps.push(
      Array.from(
        this.steps[this.currentStepIndex],
        i => new Element(i.value, i.patched, i.selected)
      )
    );
    this.currentStepIndex++;
  }
}

export { Array1DTracer };
