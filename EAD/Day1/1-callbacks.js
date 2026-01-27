// ========================================
// 1. CALLBACKS - The Foundation
// ========================================

// Callback: A function passed as an argument to another function

// Simple Example
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

// Using callback
greet("Alice", sayGoodbye);

// OUTPUT:
// Hello, Alice
// Goodbye!

console.log("\n--- Practical Example: File Operations ---\n");
// OUTPUT:
// 
// --- Practical Example: File Operations ---
// 

// Simulating file reading (blocking operation)
function readFile(filename, callback) {
  console.log(`Reading file: ${filename}...`);
  
  // Simulate delay (like reading from disk)
  setTimeout(() => {
    console.log(`File content: "This is ${filename}"`);
    callback(null, `Content of ${filename}`);
  }, 1000);
}

// Using callback with file reading
readFile("data.txt", (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Received data:", data);
  }
});

// OUTPUT SEQUENCE (happens over 1 second):
// Line 1 (immediate): Reading file: data.txt...
// Line 2 (after 1000ms): File content: "This is data.txt"
// Line 3 (after 1000ms): Received data: Content of data.txt

console.log("\n--- Callback Hell Example ---\n");
// OUTPUT:
// 
// --- Callback Hell Example ---
// 

// Problem: Nested callbacks (Callback Hell / Pyramid of Doom)
function task1(callback) {
  setTimeout(() => {
    console.log("Task 1 completed");
    callback();
  }, 500);
}

function task2(callback) {
  setTimeout(() => {
    console.log("Task 2 completed");
    callback();
  }, 500);
}

function task3(callback) {
  setTimeout(() => {
    console.log("Task 3 completed");
    callback();
  }, 500);
}

function task4() {
  setTimeout(() => {
    console.log("Task 4 completed");
  }, 500);
}

// This is Callback Hell - hard to read and maintain
task1(() => {
  task2(() => {
    task3(() => {
      task4();
    });
  });
});

// OUTPUT SEQUENCE (each task waits 500ms before starting):
// After 500ms:  Task 1 completed
// After 1000ms: Task 2 completed
// After 1500ms: Task 3 completed
// After 2000ms: Task 4 completed
// 
// Total time: ~2000ms (2 seconds)
// 
// Notice the PYRAMID SHAPE - This is Callback Hell!
// ┌─────────────────────────────────────┐
// │  task1(() => {                      │
// │    task2(() => {                    │
// │      task3(() => {                  │
// │        task4();                     │
// │      });                            │
// │    });                              │
// │  });                                │
// └─────────────────────────────────────┘

console.log("\n--- Why Callbacks Are Problematic ---");
console.log("1. Callback Hell: Deeply nested code (hard to read)");
console.log("2. Error Handling: Error handling gets complicated");
console.log("3. Maintainability: Difficult to debug and maintain");
console.log("4. Linear Flow: Hard to understand execution order");
