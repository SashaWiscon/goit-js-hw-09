const formEL = document.querySelector('.form');
formEL.addEventListener('submit', onPromiseSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const shouldResolve = Math.random();
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        resolve({ position, delay });
      } else {
        // reject(`❌ Rejected promise ${position} in ${delay}ms`);
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseSubmit(evt) {
  evt.preventDefault();
  const delay = evt.currentTarget.delay;
  const step = evt.currentTarget.step;
  const amount = evt.currentTarget.amount;

  let timerId;
  let amountInter = Number(amount.value);
  let positionP = 1;
  let delayP = Number(delay.value);

  timerId = setInterval(() => {
    createPromise(positionP, delayP)
      .then(value => {
        console.log(
          `✅ Fulfilled promise ${value.position} in ${value.delay}ms`
        );
      })
      .catch(value => {
        console.log(
          `❌ Rejected promise ${value.position} in ${value.delay}ms`
        );
      });

    positionP += 1;
    amountInter -= 1;
    delayP += Number(step.value);

    if (!amountInter) {
      clearInterval(timerId);
    }
  }, Number(step.value));
}


