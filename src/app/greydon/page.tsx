"use client";
import { useState } from "react";

export default function Home() {
  // React/Next.js supports useState() to track and store data that you can
  // display and collect from the page. In the examples below, we have two
  // variables we can play with: name and age. With name, we can provide a
  // default. Maybe we retrieved it from a database and we are allowing
  // the user to edit. Maybe we want to provide a different type of default.
  const [name, setName] = useState<string>("Greydon");
  const [age, setAge] = useState<string>();

  // This is the function that will get called when we click the "Submit" button.
  // We can do whatever want here. We can validate the data, manipulate it in some
  // way, save it to a database or call an API.
  const onSubmit = () => {
    console.log("Submit was clicked. Woohoo!");
    console.log("Name:", name);
    console.log("Age:", age);
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24 bg-gradient-to-b from-green-900/90 via-green-400/90 to-green-200/90">
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="age">Age:</label>
      <input name="age" value={age} onChange={(e) => setAge(e.target.value)} />

      <button onClick={onSubmit}>Submit</button>
    </main>
  );
}
