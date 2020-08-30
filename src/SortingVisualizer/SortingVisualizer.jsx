import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 80;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            arrayUnsorted: [],
            array: [],
            array2: [],
            array3: [],
            array4: [],
            bubbleTime: 0,
            quickTime: 0,
            heapTime: 0,
            mergeTime: 0,
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const arrayUnsorted = [];
        const array = [];
        const array2 = [];
        const array3 = [];
        const array4 = [];

        for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++){
            let randInt = randomIntFromInterval(5,280);
            arrayUnsorted.push(randInt);
            array.push(randInt);
            array2.push(randInt);
            array3.push(randInt);
            array4.push(randInt);                        
        }

        // const array2 = array.slice();
        // const array3 = array.slice();
        // const array4 = array.slice();
        this.setState({array});
        this.setState({array2});
        this.setState({array3});
        this.setState({array4}); 
        this.setState({arrayUnsorted});               
        //this.setState({array});
    }

    mergeSort() {
        console.log(this.state.array);
        const animations = getMergeSortAnimations(this.state.array);

        // for (let i = 0; i < this.state.arrayUnsorted.length; i++) {
        //     const arrayBars = document.getElementsByClassName('array-bar');
        //         const [barOneIdx, barOneHeight] = this.state.arrayUnsorted[i];
        //       const barOneStyle = arrayBars[barOneIdx].style;
        //         barOneStyle.height = `${barOneHeight}px`; 
        //   }

//         for(let i=0;i<this.state.arrayUnsorted.length;i++){
//             //let barOneHeight = this.state.arrayUnsorted[i];
//             let barOneHeight = 50;
//             const arrayBars = document.getElementsByClassName('array-bar');            
//             const barOneStyle = arrayBars[i].style;
//             barOneStyle.height = `${barOneHeight}px`;
//         }

        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          
            setTimeout(() => {
              const [barOneIdx, barOneHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${barOneHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
      }    

      quickSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
    
        const animations2 = getQuickSortAnimations(this.state.array2);
        for (let i = 0; i < animations2.length; i++) {
          //   console.log(animations[i]);
          const arrayBars = document.getElementsByClassName('array-bar2');
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations2[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }


    bubbleSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
    
        const animations3 = getBubbleSortAnimations(this.state.array3);
        for (let i = 0; i < animations3.length; i++) {
          //console.log(animations[i]);
          const arrayBars = document.getElementsByClassName('array-bar3');
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations3[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
    }

    heapSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
    
        const animations4 = getHeapSortAnimations(this.state.array4);
        for (let i = 0; i < animations4.length; i++) {
          //   console.log(animations[i]);
          const arrayBars = document.getElementsByClassName('array-bar4');
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations4[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    
    allSort() {
        let mergeStart = Date.now(); // milliseconds count from 1 Jan 1970           
        this.mergeSort();         
        let mergeEnd = Date.now(); // milliseconds count from 1 Jan 1970  
        let bubbleStart = Date.now(); // milliseconds count from 1 Jan 1970        
        this.bubbleSort();
        let bubbleEnd = Date.now(); // milliseconds count from 1 Jan 1970
        let quickStart = Date.now(); // milliseconds count from 1 Jan 1970              
        this.quickSort();   
        let quickEnd = Date.now(); // milliseconds count from 1 Jan 1970  
        let heapStart = Date.now(); // milliseconds count from 1 Jan 1970                        
        this.heapSort(); 
        let heapEnd = Date.now(); // milliseconds count from 1 Jan 1970             
        
        let bubbleTime = bubbleEnd - bubbleStart;
        let quickTime = quickEnd - quickStart;
        let heapTime = heapEnd - heapStart;
        let mergeTime = mergeEnd - mergeStart; 
        
        this.setState({bubbleTime});
        this.setState({quickTime});
        this.setState({heapTime});
        this.setState({mergeTime});
        
        console.log(bubbleTime);
        console.log(quickTime);
        console.log(heapTime);                
        console.log(mergeTime);                          
    }   

    allSort2() {        
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
              <div id="parent"> 
              <div className="array-containers">
              <h1 class="title">Sorting Algorithms Visualizer</h1>                  
                {array.map((value, idx) => (
                  <div
                    className="array-bar"
                    key={idx}
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      height: `${value}px`,
                    }}></div>                
                ))} 
                <button class="hidden-button"></button>
                {array2.map((value, idx) => (
                  <div
                    className="array-bar2"
                    key={idx}
                    style={{
                      height: `${value}px`,
                    }}></div>                
                ))}                               
              </div>   
              <div className="array-containers">
                  {/* <h1>Bubble sort Heap Sort</h1> */}
                {array3.map((value, idx) => (
                  <div
                    className="array-bar3"
                    key={idx}
                    style={{
                      height: `${value}px`,
                    }}></div>                
                ))} 
                <button class="hidden-button"></button>                
                {array4.map((value, idx) => (
                  <div
                    className="array-bar4"
                    key={idx}
                    style={{
                      height: `${value}px`,
                    }}></div>                
                ))}                               
              </div> 
              <button class="button-reset" onClick={() => window.location.reload(false)}>generate new array</button>
                <button class="button-merge" onClick={() => this.mergeSort()}>merge sort</button>
                <button class="button-quick" onClick={() => this.quickSort()}>quick sort</button>
                <button class="button-bubble" onClick={() => this.bubbleSort()}>bubble sort</button>
                <button class="button-heap" onClick={() => this.heapSort()}>heap sort</button>     
                <button class="button-all" onClick={() => this.allSort()}>sort all!</button>  


                <div>
                <button class="button-runtime">run time [ms]:</button>                    
                <button class="button-mergeTime">{this.state.mergeTime}</button>
                <button class="button-quickTime">{this.state.quickTime}</button>
                <button class="button-bubbleTime">{this.state.bubbleTime}</button>
                <button class="button-heapTime">{this.state.heapTime}</button>                      
                  </div>  

              </div>                        
            );
          }
}




function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1) + min);
}

