export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  //console.log(array);


  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
        animations.push([j, j + 1, array[j], array[j + 1]])
      }
    }
  }

  return animations;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  //console.log(array);

  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getHeapSortAnimations(arr) {
  let n = arr.length;
  const animations = [];
  if (arr.length <= 1) return arr;

  // Build heap (rearrange array) 
  for (let i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i, animations);

  // One by one extract an element from heap 
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end 
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push([0, i, arr[0], arr[i]]);

    // call max heapify on the reduced heap 
    heapify(arr, i, 0, animations);
  }

  //console.log(animations);
  //console.log(arr);

  return animations;

}

function heapify(arr, n, i, animations) {
  let largest = i; // Initialize largest as root 
  let l = 2 * i + 1; // left = 2*i + 1 
  let r = 2 * i + 2; // right = 2*i + 2 

  // If left child is larger than root 
  if (l < n && arr[l] > arr[largest])
    largest = l;

  // If right child is larger than the largest so far
  if (r < n && arr[r] > arr[largest])
    largest = r;

  // If largest is not root 
  if (largest !== i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    animations.push([i, largest, arr[i], arr[largest]]);

    // Recursively heapify the affected sub-tree 
    heapify(arr, n, largest, animations);
  }
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function quickSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {
  if (startIdx < endIdx) {
    let pi = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, endIdx, animations);
  }

  return animations;
}

function partition(
  mainArray,
  startIdx,
  endIdx,
  animations
) {
  const pivot = mainArray[endIdx];
  let i = startIdx - 1;
  for (let j = startIdx; j < endIdx; j++) {
    // If current element is smaller than the pivot 
    if (mainArray[j] < pivot) {
      i = i + 1;

      // swap arr[i] and arr[j] 
      const temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
      animations.push([i, j, mainArray[i], mainArray[j]]);
    }
  }

  // swap arr[i+1] and arr[high] (or pivot) 
  const temp = mainArray[i + 1];
  mainArray[i + 1] = mainArray[endIdx];
  mainArray[endIdx] = temp;
  animations.push([i + 1, endIdx, mainArray[i + 1], mainArray[endIdx]]);


  return i + 1;
}
