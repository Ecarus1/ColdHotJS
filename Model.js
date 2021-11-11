let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export let shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

shuffle(numbers);
export let hiddenNumber = [numbers[0], numbers[1], numbers[2]];
console.log(hiddenNumber);
hiddenNumber = hiddenNumber.join('');
hiddenNumber = hiddenNumber.split('');