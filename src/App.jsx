import "./App.css";
// import { useState, useEffect } from "react";

/*

1. useState


function App() {
  const [counter, setCounter] = useState(0); //useState with counter

  const [name, setName] = useState(""); //useState with input

  const [details, setDetails] = useState({ counter: 0, name: "" });

  function increaseCounter() {
    setDetails((prev) => ({
      ...prev,
      Whenever we work with object or arrays, we need to first add all previous values
      by using spread operator, and then update whatever we need to update
      counter: prev.counter + 1,
    }));
  }

  console.log(details);

  return (
    <div className="App">
      <h1>useState</h1>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>
        {details.name} has clicked {details.counter} times!
      </h1>
      <button onClick={increaseCounter}>Increase</button>
    </div>
  );
}

export default App;

*/

/*

2. useEffect


const App = () => {
const [count, setCount] = useState(0);
const [otherCount, setOtherCount] = useState(5);

useEffect(() => {
  document.title = `${count} new messages`;
});
Without dependecies => Runs every time component re-renders

useEffect(() => {
  document.title = `${count} new messages`;
}, []);
With an empty array => Runs only the first time component renders

useEffect(() => {
  document.title = `${otherCount} new messages`;
}, [otherCount]);
With variables, we only run useEffect when state variable change (you can pass more then one variables)

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Run useEffect", count);

    return () => {
      console.log("Clean up", count);
    };
  }, [count]);

Clean-up function => Not required in every case, only when you need to stop
repetitive side effect when my component unmounts

  return (
    <div className="App">
      <h1>useEffect</h1>
      <h3></h3>
      <button>Increase</button>
    </div>
  );
};

export default App;

*/

/*

3. useContext

import React from "react";
import MainComponent from "./components/MainComponent";
import LoginContextProvider from "./context/LoginContextProvider";

const App = () => {
  return (
    <LoginContextProvider>
      <div className="App">
        <h1>useContext!</h1>
        <MainComponent />
      </div>
    </LoginContextProvider>
  );
};

export default App;

*/

/*

4. useRef

-1st use => Storing a mutable value that does not cause re-render

import React, { useState, useEffect } from "react";
import { useRef } from "react";

const App = () => {
  const [name, setName] = useState("");

  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  LIKE THIS

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(prev=> prev+1)
  })

  NOT WITH useState and useEffect

  return (
    <div className="App">
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>useRef part1</h1>
      <h1>Hello: {name}</h1>
      <h2>Renders: {count.current}</h2>
    </div>
  );
};

export default App;



import React, { useRef } from "react";

const App = () => {
  const inputElement = useRef();

  const handleClick = () => {
    console.log(inputElement);
    inputElement.current.style.width = "300px"; //To change width of input when clicked on a button
    inputElement.current.focus(); //To focus on input when clicked on a button
  };

  return (
    <div className="App">
      <h1>useRef part2</h1>
      <input type="text" ref={inputElement} />
      <button onClick={handleClick}>Click here!</button>
    </div>
  );
};

export default App;

*/

/*

5.useReducer

import React, { useReducer } from "react";

const ACTION  = {
  INCREASE: 'increase',
  DECREASE: 'decrease'
}

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREASE:
      return { count: state.count + 1 };
    case ACTION.DECREASE:
      return { count: state.count - 1 };

    default:
      return state;
  }
};

state => Where our app is currently at
action => Which action we have to perform

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  reducer function => Manages all states
  second one is default state (initial state)

  const increaseCount = () => {
    dispatch({ type: ACTION.INCREASE });
  };

  const decreaseCount = () => {
    dispatch({ type: ACTION.DECREASE });
  };

  return (
    <div className="App">
      <h1>useReducer</h1>
      Count: {state.count}
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  );
};

export default App;

*/

/*

6. useLayoutEffect

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const App = () => {
  const [toggle, setToggle] = useState(false);

  const textRef = useRef();

  useLayoutEffect(() => {
    if (textRef.current != null) {
      const dimension = textRef.current.getBoundingClientRect();
      console.log(dimension);
      textRef.current.style.paddingTop = `${dimension.height}px`;
    }
  }, [toggle]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, [toggle]);
  useLayoutEffect always runs first

  return (
    <div className="App">
      <h1>useLayoutEffect</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      {toggle && <h3 ref={textRef}>Djordje Vasilevski</h3>}
    </div>
  );
};

export default App;
*/

/*

7. useMemo

import React, { useState, useMemo } from "react";

const App = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const memoCalculation = useMemo(() => {
    exprensiveFunction(number);
  }, [number]);

  Takes two arguments
  1.Callback function
  2.Dependancy array

  const cssStyle = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  return (
    <div style={cssStyle}>
      <h1>useMemo</h1>
      <input
        onChange={(e) => setNumber(e.target.valueAsNumber)}
        type="number"
        value={number}
      />
      <h2>Calculation: {memoCalculation}</h2>
      <button onClick={() => setDark(!dark)}>Toggle</button>
    </div>
  );
};

function exprensiveFunction(num) {
  console.log("Loop started");
  for (let i = 0; i < 10000000000; i++) return num;
}

export default App;
*/

/*
8. useCallback

import React, { useState, useCallback } from "react";
import PrintTable from "./components/PrintTable";

const App = () => {
  const [number, setNumber] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);

  const calculateTable = useCallback(() => {
    return [number * 1, number * 2, number * 3, number * 4, number * 5];
  }, [number]);
  When i execute this code, it will only re-render if we change number
  You can even pass parameters

  const cssStyle = {
    backgroundColor: darkTheme ? "black" : "white",
    color: darkTheme ? "white" : "black",
  };

  return (
    <div style={cssStyle}>
      <h1>useCallback</h1>
      <input
        onChange={(e) => setNumber(e.target.valueAsNumber)}
        type="number"
        value={number}
      />
      <PrintTable calculateTable={calculateTable} />
      <h2>Calculation: </h2>
      <button onClick={() => setDarkTheme(!darkTheme)}>Toggle</button>
    </div>
  );
};

export default App;

*/

/*

9. Custom hooks

import React from "react";
import useFetch from "./custom hooks/useFetch";

const App = () => {
  const data = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="App">
      <h1>Custom hooks</h1>
      {data.map((res) => {
        return (
          <h4 key={res.id}>
            {res.id} {res.name}
          </h4>
        );
      })}

      I display data i fetch using map method 
      </div>
      );
    };
    
    export default App;

*/
