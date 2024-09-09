const cseQuestions = {
  // Data Structures
  dataStructures: [
    "What are the differences between an array and a linked list?",
    "How does a binary search tree (BST) differ from a binary tree?",
    "Explain the working of a stack and give examples of its real-world applications.",
    "What is a hash table, and how is it implemented?",
    "Compare depth-first search (DFS) and breadth-first search (BFS) algorithms."
  ],

  // Algorithms
  algorithms: [
    "Explain the time complexity of the quicksort algorithm.",
    "How does dynamic programming differ from greedy algorithms?",
    "What is the significance of Big O notation in algorithm analysis?",
    "Describe the Dijkstra algorithm and its use cases.",
    "How can you detect and handle cycles in a graph?"
  ],

  // Operating Systems
  operatingSystems: [
    "What are the different types of process scheduling algorithms?",
    "Explain the concept of deadlock in an operating system. How can it be prevented or avoided?",
    "What is virtual memory, and how does it work?",
    "Compare preemptive and non-preemptive multitasking.",
    "How do semaphores and mutexes help in process synchronization?"
  ],

  // Databases
  databases: [
    "What is normalization in databases, and why is it important?",
    "How do ACID properties ensure reliable transactions in a database?",
    "What is the difference between SQL and NoSQL databases?",
    "How does indexing improve the performance of database queries?",
    "What is the role of a database management system (DBMS)?"
  ],

  // Networking
  networking: [
    "What is the OSI model, and what are its layers?",
    "Explain the difference between TCP and UDP.",
    "How does DNS work, and why is it important for the internet?",
    "What is a firewall, and how does it protect a network?",
    "Explain the concept of IP addressing and subnetting."
  ],

  // Programming Languages
  programmingLanguages: [
    "What are the key differences between object-oriented and procedural programming?",
    "How does garbage collection work in Java?",
    "Explain the concept of closures in JavaScript.",
    "Compare static typing and dynamic typing in programming languages.",
    "What is polymorphism in object-oriented programming? Give an example."
  ],

  // Artificial Intelligence and Machine Learning
  aiAndMachineLearning: [
    "What is the difference between supervised and unsupervised learning?",
    "Explain the concept of neural networks and how they are trained.",
    "How does reinforcement learning differ from traditional machine learning?",
    "What are the applications of natural language processing (NLP)?",
    "How do decision trees and random forests work?"
  ],

  // Cybersecurity
  cybersecurity: [
    "What is encryption, and why is it essential for securing data?",
    "Explain the difference between symmetric and asymmetric cryptography.",
    "How do SSL/TLS protocols secure web communication?",
    "What is the role of a penetration test in cybersecurity?",
    "What are some common cybersecurity threats, and how can they be mitigated?"
  ],

  // Software Engineering
  softwareEngineering: [
    "What are the key stages of the software development life cycle (SDLC)?",
    "How does Agile methodology differ from Waterfall methodology?",
    "Explain the concept of version control and its importance in software development.",
    "What are design patterns, and why are they useful?",
    "How can unit testing improve software quality?"
  ],

  // Cloud Computing
  cloudComputing: [
    "What are the different types of cloud services (IaaS, PaaS, SaaS)?",
    "How does virtualization work in cloud computing?",
    "Explain the concept of containerization and tools like Docker.",
    "What are the security concerns in cloud computing, and how can they be addressed?",
    "How does serverless computing work, and what are its benefits?"
  ]
};


let select = document.getElementById("subjects");
let question = document.getElementById("question");
let main = document.getElementById("main");
let contentDiv = document.createElement("div");

select.addEventListener("change", () => {
  main.innerHTML = "";
  question.innerHTML = "";
  let i = 0;
  let proceed = false;
  let selectedSubject = select.value;
  let questionsList = cseQuestions[selectedSubject];
  let buttonContainer = document.createElement("div");
  let next = document.createElement("button");
  let previous = document.createElement("button");
  let evaluate = document.createElement("button");
  let textarea = document.createElement("textarea");

  textarea.cols = 50;
  textarea.rows = 8;
  next.innerText = "Next";
  previous.innerText = "Previous";
  evaluate.innerText = "Evaluate";
  textarea.className = "custom-textarea";
  buttonContainer.className = "button-container";
  next.className = "custom-button";
  previous.className = "custom-button";
  evaluate.className = "custom-button";

  next.addEventListener('click', () => {
    questionsList.length > i && i++;
    if (i < questionsList.length) {
      proceed && main.removeChild(contentDiv);
      question.innerHTML = "";
      textarea.value = "";
      question.innerHTML += `<h1>${questionsList[i]}</h1>`;
    }
  })

  previous.addEventListener('click', () => {
    i >= 0 && i--;
    if (i >= 0) {
      proceed && main.removeChild(contentDiv);
      question.innerHTML = "";
      textarea.value = "";
      question.innerHTML += `<h1>${questionsList[i]}</h1>`;
    }
  })

  evaluate.addEventListener('click', () => {
    let answer = textarea.value;
    if (answer.trim() != "") {
      proceed = true;
      generateContent(questionsList[i], answer);
    } else {
      Swal.fire({
        title: "Answer?",
        text: "There is no answer provided?",
        icon: "question"
      });
    }
  })
  question.innerHTML += `<h1>${questionsList[i]}</h1>`;
  buttonContainer.append(previous, evaluate, next);
  main.append(question, textarea, buttonContainer);
})

// (and it's working in console)
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCtxce9nryccDkWmkyRFlwZMIesRk-ZhHg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async (question, answer) => {
  const prompt = "question " + question + " answer " + answer + " in brief evaluate the answer maximum 300 words.";
  contentDiv.className = "analysis-message";
  contentDiv.innerText = "Analyzing the answer ....";
  main.append(contentDiv);
  try {
    const result = await model.generateContent(prompt);

    if (result && result.response && result.response.text) {
      contentDiv.classList.toggle("analysis-message");
      contentDiv.classList.toggle("result-message");
      contentDiv.innerHTML = "";
      contentDiv.innerText = await result.response.text();
    } else {
      console.error("Failed to retrieve content. Check the response structure:", result);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}