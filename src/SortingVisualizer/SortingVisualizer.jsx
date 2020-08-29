/* TO-DO:

Basics:
 -add heap-sort - L
 -add timer (either total or stopwatch) - V
 -remove mergesort color -C
 -improve layout (whitespace, grid layout etc) - V 
 -let user choose length of array - C

 Bonuses:
 -sorting speed


 */




import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 20;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      array2: [],
      array3: [],
      array4: [],
    };
  }


  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 350));
    }
    const array2 = array.slice();
    const array3 = array.slice();
    const array4 = array.slice();
    this.setState({ array });
    this.setState({ array2 });
    this.setState({ array3 });
    this.setState({ array4 });
    //this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i]);
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.

    const animations = getQuickSortAnimations(this.state.array2);
    for (let i = 0; i < animations.length; i++) {
      //   console.log(animations[i]);
      const arrayBars = document.getElementsByClassName('array-bar2');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.

    const animations = getBubbleSortAnimations(this.state.array3);
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i]);
      const arrayBars = document.getElementsByClassName('array-bar3');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }


  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.

    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      //   console.log(animations[i]);
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${barOneHeight}px`;
        barTwoStyle.height = `${barTwoHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }


  allSort() {

    this.mergeSort();
    this.bubbleSort();
    this.quickSort();
    this.heapSort();
  }


  render() {
    const { array } = this.state;
    const { array2 } = this.state;
    const { array3 } = this.state;
    const { array4 } = this.state;


    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        {/* {array2.map((value, idx) => (
          <div
            className="array-bar2"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        {array3.map((value, idx) => (
          <div
            className="array-bar3"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        {array4.map((value, idx) => (
          <div
            className="array-bar4"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))} */}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort1</button>
        <button onClick={() => this.quickSort()}>Quick Sort2</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.allSort()}>All Sort</button>
      </div>
    );
  }
}


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

