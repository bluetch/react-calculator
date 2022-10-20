import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) => {
  // return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  return String(num);
}


// clean space
const removeSpaces = (num) => {
  // \s => match a space, (ex: space, tab, newline, ...)
  return num.toString().replace(/\s/g, "");
}

// operator
const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const App = () => {
  const [calc, setCalc] = useState({
    sign: "", // operator
    num: 0, // current number
    result: 0, // result number
  });

  // number button
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        result: !calc.sign ? 0 : calc.result,
      });
    }
  };

  // coma button
  const comaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // operator button
  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      result: !calc.num
        ? calc.result
        : !calc.result
          ? calc.num
          : toLocaleString(
            math(
              Number(removeSpaces(calc.result)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  // equal button
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        result:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.result)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
      });
    }
  };

  // invert button
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
      sign: "",
    });
  };

  // percent button
  const percentClickHandler = () => {
    // parseFloat() 將字串轉換為以十進位表示的浮點數。parseFloat() 僅接受一個參數。
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

    // Math 物件的 Math.pow() 方法用來做指數運算 baseexponent。
    // x /= y	等於 x = x / y
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  // reset button
  const resetClickHandler = () => {
    console.log(calc);
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      result: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.result} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                (btn === "=" || btn === "+" || btn === "-" || btn === "X" || btn === "/")
                  ? "sign" : btn === 0 ? "zero" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                        ? equalsClickHandler
                        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                          ? signClickHandler
                          : btn === "."
                            ? comaClickHandler
                            : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
