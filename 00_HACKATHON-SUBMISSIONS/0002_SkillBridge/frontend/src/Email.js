import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "./progress/ProgressContext";
import Carousel from "./components/Carousel";

const TOTAL = 5; // number of slides/steps

export default function Email() {
  const navigate = useNavigate();
  const { completeStep, percentFor } = useProgress();

  // Mark a step complete whenever the slide is reached
  const handleChange = (i) => completeStep("email", i, TOTAL);

  const slides = useMemo(() => ([
    // 1. Subject
    <section className="bg-white shadow-lg rounded-2xl p-8 md:p-10 max-w-4xl md:max-w-5xl mx-auto my-2 md:my-4 space-y-3">
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">1. Use a Clear Subject Line</h2>
      <p className="text-lg md:text-xl text-gray-700">Keep it short and specific.</p>
      <div className="bg-gray-100 p-4 md:p-5 rounded-lg">
        <strong>Example:</strong><br />
        <code>Job Application: Customer Service Assistant</code>
      </div>
    </section>,

    // 2. Greeting
   <section className="bg-white shadow-lg rounded-2xl p-8 md:p-10 max-w-4xl md:max-w-5xl mx-auto my-2 md:my-4 space-y-3">
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">2. Start with a Greeting</h2>
      <ul className="list-disc list-inside text-lg md:text-xl text-gray-800">
        <li>Dear [Hiring Manager],</li>
        <li>Hello [Name],</li>
      </ul>
    </section>,

    // 3. Body
    <section className="bg-white shadow-lg rounded-2xl p-8 md:p-10 max-w-4xl md:max-w-5xl mx-auto my-2 md:my-4 space-y-3">
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">3. Write the Body</h2>
      <div className="bg-gray-100 p-4 md:p-5 rounded-lg">
        <strong>Example:</strong>
        <p className="mt-2 text-lg md:text-xl">
          I am writing to apply for the Customer Service Assistant position at ABC Company...
        </p>
      </div>
    </section>,

    // 4. Closing
    <section className="bg-white shadow-lg rounded-2xl p-8 md:p-10 max-w-4xl md:max-w-5xl mx-auto my-2 md:my-4 space-y-3">
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">4. End with a Closing</h2>
      <ul className="list-disc list-inside text-lg md:text-xl text-gray-800">
        <li>Sincerely,</li>
        <li>Best regards,</li>
      </ul>
      <p className="text-lg md:text-xl text-gray-700">Then type your name underneath.</p>
    </section>,

    // 5. Final example + CTA
    <section className="bg-white shadow-lg rounded-2xl p-8 md:p-10 max-w-4xl md:max-w-5xl mx-auto my-2 md:my-4 space-y-3">
      <h2 className="text-3xl md:text-4xl font-semibold text-blue-700">5. Final Email Example</h2>
      <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 text-lg md:text-xl">
        <p><strong>Subject:</strong> Job Application: Customer Service Assistant</p>
        <p className="mt-2">Dear Hiring Manager, ...</p>
        <p className="mt-2">Sincerely,<br/>Alex Johnson</p>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => navigate("/lessons")}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white hover:bg-gray-700"
        >🔙 Back to Lessons</button>
        <button
          onClick={() => {
            completeStep("email", 4, TOTAL);
            navigate("/lessons/email-quiz");
          }}
          className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
        >🎓 Try Questions</button>
      </div>
    </section>,
  ]), [navigate, completeStep]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 text-center">
        📧 How to Write a Professional Email
      </h1>
          <div className="max-w-6xl mx-auto mt-4 mb-2 px-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-gray-700 text-white px-4 py-2 shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            🏠 Home
          </button>

          <button
            onClick={() => navigate("/lessons")}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            📚 Lessons
          </button>
        </div>

        <p className="text-gray-700 text-base md:text-lg">Progress: {percentFor("email")}%</p>

      {/* the slider */}
      <Carousel
        slides={slides}
        initial={0}
        onChange={handleChange}
        className="mt-8 md:mt-10 mb-20 md:mb-28 px-2"  
        ariaLabel="Email lesson slides"
      />
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useProgress } from "./progress/ProgressContext";
// const TOTAL_STEPS = 5; // total sections in this lesson d

// export default function Email() {
//    const navigate = useNavigate();
//    const { completeStep, percentFor } = useProgress(); // <-- use hook
//    const markDone = (index) => completeStep("email", index, TOTAL_STEPS);
//     return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center animate-fade-in">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 text-center">
//         📧 How to Write a Professional Email
//       </h1>
//       <p className="text-lg text-gray-700 mb-4">
//         Progress: {percentFor("email")}% complete
//       </p>
//       <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-6">
//         Writing a professional email can help you apply for jobs, communicate with employers,
//         and make a good impression. Let’s go through it step by step.
//       </p>

//       {/* Section 1: Subject Line */}
//       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">1. Use a Clear Subject Line</h2>
//         <p className="text-gray-700 mb-2">
//           A subject line tells the reader what your email is about. Keep it short and specific.
//         </p>
//         <div className="bg-gray-100 p-3 rounded mb-3">
//           <strong>Example:</strong><br />
//           <code>Job Application: Customer Service Assistant</code>
//         </div>
//         <button
//           onClick={() => markDone(0)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           ✅ Mark Step 1 Complete
//         </button>
//       </section>

//       {/* Section 2: Greeting */}
//       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">2. Start with a Greeting</h2>
//         <p className="text-gray-700 mb-2">Begin your email politely with one of these greetings:</p>
//         <ul className="list-disc list-inside text-gray-800 mb-3">
//           <li>Dear [Hiring Manager],</li>
//           <li>Hello [Name],</li>
//         </ul>
//         <button
//           onClick={() => markDone(1)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           ✅ Mark Step 2 Complete
//         </button>
//       </section>

//       {/* Section 3: Email Body */}
//       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">3. Write the Body</h2>
//         <p className="text-gray-700 mb-2">Explain who you are and why you're writing.</p>
//         <div className="bg-gray-100 p-3 rounded mb-3">
//           <strong>Example:</strong>
//           <p className="mt-2">
//             I am writing to apply for the Customer Service Assistant position at ABC Company.
//             I have experience working with people and enjoy helping customers. Please find my resume attached.
//           </p>
//         </div>
//         <button
//           onClick={() => markDone(2)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           ✅ Mark Step 3 Complete
//         </button>
//       </section>

//       {/* Section 4: Closing */}
//       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">4. End with a Closing</h2>
//         <p className="text-gray-700 mb-2">Finish your email with a polite closing:</p>
//         <ul className="list-disc list-inside text-gray-800 mb-3">
//           <li>Sincerely,</li>
//           <li>Best regards,</li>
//         </ul>
//         <p>Then type your name underneath.</p>
//         <button
//           onClick={() => markDone(3)}
//           className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           ✅ Mark Step 4 Complete
//         </button>
//       </section>

//       {/* Section 5: Final Example */}
//       <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
//         <h2 className="text-2xl font-semibold text-blue-700 mb-2">5. Final Email Example</h2>
//         <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-3">
//           <p><strong>Subject:</strong> Job Application: Customer Service Assistant</p>
//           <p className="mt-2">Dear Hiring Manager,</p>
//           <p className="mt-2">
//             I am writing to apply for the Customer Service Assistant position at ABC Company.
//             I have 2 years of experience working in customer service and enjoy helping people solve problems.
//             Please find my resume attached.
//           </p>
//           <p className="mt-2">Sincerely,<br />Alex Johnson</p>
//         </div>
//         <button
//           onClick={() => markDone(4)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           ✅ Mark Step 5 Complete
//         </button>
//       </section>

//       {/* Navigation Buttons */}
//       <div className="flex flex-col md:flex-row gap-4 mt-6">
//         <button
//           onClick={() => navigate("/lessons")}
//           className="px-6 py-3 bg-gray-500 text-white font-medium rounded-xl shadow hover:bg-gray-600 transition duration-200"
//         >
//           🔙 Back to Lessons
//         </button>
//         <button
//           onClick={() => {
//             markDone(4); // Mark final step complete before quiz
//             navigate("/lessons/email-quiz");
//           }}
//           className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition duration-200"
//         >
//           🎓 Try Questions
//         </button>
//       </div>
//     </div>
//   );
// }
