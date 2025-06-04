
import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/600.css";

const questions = [
  {
    question: "What is your current educational level?",
    options: [
      "I am currently an undergraduate student or do not yet have a Bachelor's degree.",
      "I have a Bachelor's degree.",
      "I have a Master's degree."
    ]
  },
  {
    question: "What best describes your career status?",
    options: [
      "I am early in my career and exploring different paths.",
      "I am working in behavioral health or human services.",
      "I am in a different field and considering a career change into psychology or counseling."
    ]
  },
  {
    question: "What are your long-term professional goals?",
    options: [
      "Obtain a clinical license and work directly with clients.",
      "Conduct research or teach in higher education.",
      "Work in a psychology-related field like UX research, tech, nonprofit, or advocacy."
    ]
  },
  {
    question: "What type of academic schedule best fits your life?",
    options: [
      "I need an online or hybrid option with evening/weekend flexibility.",
      "I can commit to a full-time, in-person or hybrid program.",
      "I prefer asynchronous, self-paced learning due to work/family obligations."
    ]
  },
  {
    question: "What is most important in choosing your program?",
    options: [
      "Accreditation and licensure pathways.",
      "Flexibility and balance with current responsibilities.",
      "Faculty mentorship and academic reputation."
    ]
  }
];

const programDescriptions = {
  "Master's in Clinical Mental Health Counseling": "This program is ideal for those transitioning into counseling from non-clinical backgrounds and offers flexibility and CACREP accreditation.",
  "Undergraduate to Master's of Social Work Pathway": "Designed for non-traditional undergrads, this pathway sets you up for graduate-level clinical licensure.",
  "Master's of Social Work": "Perfect for professionals looking to pursue LCSW licensure with leadership development and community impact.",
  "Master's in Psychology": "A non-licensure path for those exploring research, UX, or further academic studies.",
  "Doctorate in Clinical Psychology (PhD)": "Balances clinical and academic training for those pursuing licensure, research, or teaching.",
  "Doctorate in Clinical Psychology (PsyD)": "Best suited for hands-on clinical work and prestigious practicum placement through a Stanford partnership."
};

const results = [
  {
    title: "Master's of Social Work",
    match: [1, 1, 0, 0, 0],
    program: "Master's of Social Work",
    alternatives: ["Master's in Clinical Mental Health Counseling", "Undergraduate to Master's of Social Work Pathway"],
    why: "We think you'd love our Master's of Social Work. The program is designed for working professionals in behavioral health who need a flexible path to LCSW licensure, leadership, and real-world clinical roles."
  },
  {
    title: "Master's in Clinical Mental Health Counseling",
    match: [1, 2, 0, 0, 1],
    program: "Master's in Clinical Mental Health Counseling",
    alternatives: ["Master's of Social Work", "Master's in Psychology"],
    why: "We think you'd love our Master's in Clinical Mental Health Counseling. This program is CACREP-accredited, flexible, and great for professionals transitioning into counseling from other fields such as education, healthcare, or business."
  },
  {
    title: "Master's in Psychology",
    match: [1, 0, 1, 2, 2],
    program: "Master's in Psychology",
    alternatives: ["Doctorate in Clinical Psychology (PhD)", "Master's in Clinical Mental Health Counseling"],
    why: "We think you'd love our Master's in Psychology. The program offers a research-focused, non-licensure path ideal for exploring diverse roles or preparing for doctoral studies."
  },
  {
    title: "Doctorate in Clinical Psychology (PhD)",
    match: [2, 1, 1, 1, 2],
    program: "Doctorate in Clinical Psychology (PhD)",
    alternatives: ["Doctorate in Clinical Psychology (PsyD)", "Master's in Psychology"],
    why: "We think you'd love our Doctorate in Clinical Psychology (PhD). The APA-accredited program balances clinical training and research, ideal for those aiming for teaching, licensure, or leadership in psychology."
  },
  {
    title: "Doctorate in Clinical Psychology (PsyD, PAU-Stanford Consortium)",
    match: [2, 0, 0, 1, 0],
    program: "Doctorate in Clinical Psychology (PsyD, PAU-Stanford Consortium)",
    alternatives: ["Doctorate in Clinical Psychology (PhD)", "Master's in Psychology"],
    why: "We think you'd love our Doctorate in Clinical Psychology (PsyD, PAU-Stanford Consortium). This prestigious program emphasizes premier clinical training, top APA internship match rates, and access to elite practicum sites through a Stanford partnership."
  }
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = index;
    setAnswers(updatedAnswers);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(Math.max(0, step - 1));
  };

  const getResult = () => {
    return results.find((r) => r.match.every((val, idx) => val === answers[idx])) || results[0];
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const choiceStyle = "border border-[#005A9C] rounded-xl px-4 py-3 my-2 hover:bg-[#e6f0fa] transition-all";
  const progress = Math.round((step / questions.length) * 100);

  if (step < questions.length) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mt-10 font-sans">
        <h1 className="text-2xl font-bold text-center mb-6">Find the Degree that Fits Your Goals</h1>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Step {step + 1} of {questions.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="w-full bg-[#C28DB1] rounded-full h-2">
            <div className="bg-[#991E66] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-6">{questions[step].question}</h2>
        <ul>
          {questions[step].options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`${choiceStyle} cursor-pointer`}
            >
              {opt}
            </li>
          ))}
        </ul>
        {step > 0 && (
          <button onClick={handlePrevious} className="mt-4 text-sm text-[#005A9C] underline">
            ← Previous
          </button>
        )}
      </div>
    );
  }

  const result = getResult();

  if (!submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mt-10 font-sans">
        <h2 className="text-xl font-bold mb-6">Share your email to view your results</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
        />
        <button onClick={handleSubmit} className="rounded-full px-6 py-3 text-white text-lg font-medium bg-[#005A9C] hover:bg-[#00497c] w-full">
          Submit
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow mt-10 font-sans">
      <h2 className="text-2xl font-bold mb-6">{result.title}</h2>
      <p className="mb-6">{result.why}</p>
      <p className="font-semibold mb-2">You Should Also Consider:</p>
      <ul className="list-disc list-inside mb-6">
        {result.alternatives.map((alt, i) => (
          <li key={i} className="mb-2">
            <span className="font-medium">{alt}</span>: {programDescriptions[alt]}
          </li>
        ))}
      </ul>
      <p className="mb-4">Our admissions counselors are ready to put together a customized plan for you. Click below to schedule a 1:1 advising session.</p>
      <button className="rounded-full px-6 py-3 text-white text-lg font-medium bg-[#005A9C] hover:bg-[#00497c] w-full">
        Schedule 1:1 Advising
      </button>
    </motion.div>
  );
}
