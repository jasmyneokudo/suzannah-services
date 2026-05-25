"use client";
import { useState } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(1);

  const nextSection = () => {
    // Logic to navigate to the next section
    setCurrentSection((prev) => Math.min(prev + 1, 3));
  };

  const prevSection = () => {
    // Logic to navigate to the previous section
    setCurrentSection((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="h-screen w-full bg-white">
      <section className={`bg-red-500 ${currentSection !== 1 ? 'hidden' : ''} px-2 h-28 flex flex-col justify-between mb-2`}>
        <h1 className="text-black">section 1</h1>
        <input type="text" name="Name" placeholder="enter your name"/>
        <div className="flex">
          <button onClick={prevSection}>Prev</button>
          <button onClick={nextSection}>Next</button>
        </div>
      </section>

      <section className={`bg-orange-500 ${currentSection !== 2 ? 'hidden' : ''} px-2 h-28 flex flex-col justify-between mb-2`}>
        <h1 className="text-black">section 2</h1>
        <input type="text" name="DOB" placeholder="enter your DOB"/>
        <div className="flex">
          <button onClick={prevSection}>Prev</button>
          <button onClick={nextSection}>Next</button>
        </div>
      </section>

      <section className={`bg-green-500 ${currentSection !== 3 ? 'hidden' : ''} px-2 h-28 flex flex-col justify-between mb-2`}>
        <h1 className="text-black">section 3</h1>
        <input type="text" name="Country" placeholder="enter your Country"/>
        <div className="flex">
          <button onClick={prevSection}>Prev</button>
          <button onClick={nextSection}>Next</button>
        </div>
      </section>
    </div>
  );
}
