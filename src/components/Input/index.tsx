import React, { useState, useEffect } from "react";
import style from "./index.module.scss";

interface IInputProps {
  placeholder: string;
  type: string;
  captchaSvg?: string
  refresh?: () => void
  value: (value: string) => void
}

const Input: React.FunctionComponent<IInputProps> = props => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      props.value(value)
      setInputValue((inputValue: string) => inputValue = value)
  }
  const handleFocus = () => {
    setIsFocus((isFocus: boolean) => (isFocus = true));
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue((inputValue: string) => (inputValue = value));
    !value && setIsFocus((isFocus: boolean) => (isFocus = !isFocus));
  };
  return (
      <div className={props.type === 'captcha' ? style.txtc : style.txtb}>
        <input
          type={props.type}
          value={inputValue}
          className={isFocus ? style.focus : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span data-placeholder={props.placeholder}></span>
        <p dangerouslySetInnerHTML={{ __html: props.captchaSvg as string }} onClick={props.refresh}/>
      </div>
  );
};

export default Input;
