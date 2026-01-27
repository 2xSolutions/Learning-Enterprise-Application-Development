// ========================================
// 2. PROMISES - Better Than Callbacks
// ========================================

// Promise: An object representing eventual completion (or failure) of an async operation

console.log("--- Promise Basics ---\n");

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  console.log("Promise executor running...");
  
  let success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Operation successful!"); // Changes state to FULFILLED
    } else {
      reject("Operation failed!"); // Changes state to REJECTED
    }
  }, 1000);
});

// Consuming a Promise
myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

console.log("\n--- Promise States ---");
console.log("1. PENDING: Initial state, operation not complete");
console.log("2. FULFILLED: Operation completed successfully");
console.log("3. REJECTED: Operation failed");

console.log("\n--- Replacing Callback Hell with Promises ---\n");

// Promise-based functions
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

function task4(prevResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 4 completed, received:", prevResult);
      resolve("Final Result");
    }, 500);
  });
}

// Promise Chain - Much cleaner than callbacks!
task1()
  .then((result) => task2(result))
  .then((result) => task3(result))
  .then((result) => task4(result))
  .then((finalResult) => {
    console.log("All tasks completed:", finalResult);
  })
  .catch((error) => {
    console.log("Error in chain:", error);
  });

console.log("\n--- Error Handling in Promises ---\n");

const errorPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 500);
});

errorPromise
  .then((result) => console.log(result))
  .catch((error) => console.log("Caught error:", error))
  .finally(() => console.log("Promise settled (either resolved or rejected)"));

console.log("\n--- Promise.all() - All Must Succeed ---\n");

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("foo"), 100)
);
const promise3 = fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json());

// All promises must resolve, if ANY rejects, Promise.all rejects
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("All promises resolved:", values);
  })
  .catch((error) => {
    console.log("One or more promises rejected:", error);
  });

console.log("\n--- Promise.race() - First to Complete Wins ---\n");

const race1 = new Promise((resolve) =>
  setTimeout(() => resolve("First"), 500)
);
const race2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second"), 200)
);

Promise.race([race1, race2]).then((value) => {
  console.log("First promise to resolve:", value);
});

console.log("\n--- Benefits of Promises ---");
console.log("1. Flattened code structure (no pyramid)");
console.log("2. Better error handling with .catch()");
console.log("3. Method chaining for sequential operations");
console.log("4. Promise.all() and Promise.race() for parallel operations");
