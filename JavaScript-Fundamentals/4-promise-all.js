// ========================================
// 4. PROMISE.ALL - Parallel Operations
// ========================================

// Promise.all() waits for all promises to resolve
// If ANY promise rejects, the entire Promise.all rejects

console.log("--- Promise.all() - All Success Case ---\n");

const promise1 = Promise.resolve("First");
const promise2 = Promise.resolve("Second");
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Third"), 1000)
);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("All promises resolved!");
    console.log("Results:", results); // Array of results
  })
  .catch((error) => {
    console.log("Error:", error);
  });

console.log("\n--- Promise.all() - Any Failure Case ---\n");

const successPromise = Promise.resolve("Success");
const failurePromise = Promise.reject("This failed!");
const anotherPromise = Promise.resolve("Another");

Promise.all([successPromise, failurePromise, anotherPromise])
  .then((results) => {
    console.log("All resolved:", results);
  })
  .catch((error) => {
    // This will execute if ANY promise rejects
    console.log("One or more promises failed:", error);
  });

console.log("\n--- Real-World Example: Fetching Multiple APIs ---\n");

// Simulating API calls
function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}` });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1", userId }]);
    }, 700);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, text: "Great post!", postId }]);
    }, 600);
  });
}

// Sequential approach (slower) - must wait for each one
async function sequentialApproach() {
  console.log("Sequential (slower):");
  console.time("Sequential");
  
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  
  console.log({ user, posts, comments });
  console.timeEnd("Sequential");
}

// Parallel approach (faster) - all at same time
async function parallelApproach() {
  console.log("\nParallel (faster):");
  console.time("Parallel");
  
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  
  console.log({ user, posts, comments });
  console.timeEnd("Parallel");
}

sequentialApproach();
parallelApproach();

console.log("\n--- Promise.all() vs Promise.allSettled() ---\n");

const settled1 = Promise.resolve("Success 1");
const settled2 = Promise.reject("Failed");
const settled3 = Promise.resolve("Success 3");

// Promise.allSettled waits for all to settle (resolve or reject)
// Returns array of {status, value/reason}
Promise.allSettled([settled1, settled2, settled3])
  .then((results) => {
    console.log("All settled (allSettled):");
    results.forEach((result, index) => {
      console.log(`Promise ${index}:`, result);
    });
  });

console.log("\n--- Promise.all() vs Promise.race() ---\n");

// Promise.race() returns result of FIRST promise to settle
const race1 = new Promise((resolve) =>
  setTimeout(() => resolve("First resolves"), 300)
);
const race2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second resolves"), 500)
);

Promise.race([race1, race2])
  .then((result) => {
    console.log("First to complete:", result);
  });

console.log("\n--- Handling Errors with Promise.all() ---\n");

async function robustFetch() {
  const promises = [
    fetchUser(1),
    fetchPosts(1),
    Promise.reject("Network error")
  ];
  
  try {
    const results = await Promise.all(promises);
    console.log("All succeeded:", results);
  } catch (error) {
    console.log("Error:", error);
    
    // To continue even if some fail, use Promise.allSettled()
    const settledResults = await Promise.allSettled(promises);
    console.log("Settled results:", settledResults);
  }
}

robustFetch();

console.log("\n--- Key Takeaways ---");
console.log("1. Promise.all() runs multiple promises in parallel");
console.log("2. If ANY fails, entire Promise.all fails");
console.log("3. Use for independent operations (faster)");
console.log("4. Promise.allSettled() allows some failures");
console.log("5. Promise.race() gets result of first to complete");
