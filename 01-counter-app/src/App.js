import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrement = () => setCounter((c) => c + step);

  const handleDecrement = () => setCounter((c) => c - step);

  const handleReset = function () {
    setCounter(0);
    setStep(1);
  };
  return (
    <div className="app">
      <h1>Counter App</h1>
      <Step step={step} setStep={setStep} />
      <Message counter={counter} />
      <div className="container">
        <Button onClick={handleDecrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            style={{ width: "25px", height: "25px" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </Button>
        <Counter counter={counter} />
        <Button onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            style={{ width: "25px", height: "25px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}
function Step({ step, setStep }) {
  const handleStepIncrement = function (e) {
    const value = Number(e.target.value);
    if (value > 0) setStep(value);
  };
  return (
    <div className="step">
      <label htmlFor="step_inp">Step</label>
      <input
        type="number"
        name="step_inp"
        value={step}
        onChange={handleStepIncrement}
      />
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function Counter({ counter }) {
  return <span className="counter">{counter}</span>;
}
function Message({ counter }) {
  const message =
    counter > 0 ? "Positive 😊" : counter < 0 ? "Negative 😭" : "Netural 😐";
  return <p className="reaction">{message}</p>;
}
