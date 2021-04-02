async function runPromiseByQueue(myPromises) {
  myPromises.forEach(async (task) => {
    await task();
  });
}

const createPromise = (time, id) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("promise", id);
      resolve();
    }, time)
  );
runPromiseByQueue([
  createPromise(3000, 4),
  createPromise(2000, 2),
  createPromise(1000, 1)
]);
