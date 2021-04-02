async function runPromiseByQueue(myPromises) {
  for (let i = 0; i < myPromises.length; i++) {
    await myPromises[i]();
  }
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

