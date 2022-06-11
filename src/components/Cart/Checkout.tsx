import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props: any) => {
  const [formInputValidity, setFormInputValidity]: any = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef: any = useRef();
  const streetInputRef: any = useRef();
  const postalInputRef: any = useRef();
  const cityInputRef: any = useRef();

  const isEmpty = (value: any) => value.trim() === "";
  const isFiveChars = (value: any) => value.trim().length === 6;

  const confirmHandler = (event: any) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;

    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });
    const formIsvalid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;
    if (!formIsvalid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter Correct Name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter Correct Street Name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please Enter Correct postal.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter Correct City.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
