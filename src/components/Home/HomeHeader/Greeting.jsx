import React from "react";

function Greeting() {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) greet = "Good morning";
  else if (hours >= 12 && hours <= 18) greet = "Good afternoon";
  else if (hours >= 18 && hours <= 24) greet = "Good evening";

  return <span>{greet}!</span>;
}

export default Greeting;
