import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props: any) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef: any = useRef();

  const submitHandler = (event: any) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter A valid Amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
