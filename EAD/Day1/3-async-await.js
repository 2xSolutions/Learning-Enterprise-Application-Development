// ========================================
// 3. ASYNC/AWAIT - The Modern Way
// ========================================

// Async/Await: Syntactic sugar over Promises for cleaner async code

console.log("--- Async/Await Basics ---\n");

// async keyword makes a function return a Promise
async function fetchData() {
  return "Hello from async function";
}

fetchData().then((data) => console.log(data));

console.log("\n--- Await Keyword ---\n");

// await pauses execution until Promise resolves
async function demonstrateAwait() {
  console.log("Before await");
  
  // This will wait for the promise to resolve
  const result = await new Promise((resolve) => {
    setTimeout(() => resolve("Await completed!"), 1000);
  });
  
  console.log("After await:", result);
}

demonstrateAwait();

console.log("\n--- Converting Promise Chain to Async/Await ---\n");

// Same functions from promises.js but used with async/await
function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 1 completed");
      resolve("Result 1");
    }, 500);
  });
}

function task2(prevResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 2 completed, received:", prevResult);
      resolve("Result 2");
    }, 500);
  });
}

function task3(prevResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 3 completed, received:", prevResult);
      resolve("Result 3");
    }, 500);
  });
}

// Much cleaner than promise chains!
async function runTasks() {
  try {
    const result1 = await task1();
    const result2 = await task2(result1);
    const result3 = await task3(result2);
    console.log("All tasks completed:", result3);
  } catch (error) {
    console.log("Error:", error);
  }
}

runTasks();

console.log("\n--- Error Handling with Try/Catch ---\n");

async function fetchUserData() {
  try {
    // Simulating API call
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("API Error: User not found");
      }, 500);
    });
    
    console.log("User data:", response);
  } catch (error) {
    console.log("Caught error:", error);
  } finally {
    console.log("Request completed");
  }
}

fetchUserData();

console.log("\n--- Parallel Operations with Async/Await ---\n");

async function fetchMultiple() {
  try {
    // Sequential (one after another) - slower
    console.log("Sequential approach:");
    const data1 = await task1();
    const data2 = await task2(data1);
    
    // Parallel (at the same time) - faster
    console.log("\nParallel approach:");
    const [parallelData1, parallelData2] = await Promise.all([
      task1(),
      task2("Data")
    ]);
    
    console.log("Parallel results:", parallelData1, parallelData2);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchMultiple();

console.log("\n--- Async/Await vs Promises: Comparison ---\n");

// Promises approach
function promiseApproach() {
  return task1()
    .then((result1) => task2(result1))
    .then((result2) => task3(result2))
    .then((result3) => console.log("Done:", result3))
    .catch((error) => console.log("Error:", error));
}

// Async/Await approach (cleaner!)
async function asyncAwaitApproach() {
  try {
    const result1 = await task1();
    const result2 = await task2(result1);
    const result3 = await task3(result2);
    console.log("Done:", result3);
  } catch (error) {
    console.log("Error:", error);
  }
}

console.log("Benefits of Async/Await:");
console.log("1. Looks like synchronous code (easier to read)");
console.log("2. Built on Promises (all Promise features available)");
console.log("3. Try/catch for error handling");
console.log("4. Easier to debug (step through like sync code)");
console.log("5. Combined with Promise.all() for parallel execution");
