// Fisher-Yates shuffle algorithm
function shuffleFisherYates(array: any[]) {
  // Loop through array starting at the last index
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Durstenfeld's version of the Fisher-Yates algorithm
function shuffleDurstenfeld(array: any[]) {
  // Loop through array starting at the last index
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j (single line)
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleInsideOut(array: any[]) {
  // Loop through array starting at the first index
  for (let i = 0; i < array.length; i++) {
    // Generate a random index from i to the last index
    const j = i + Math.floor(Math.random() * (array.length - i));
    // Swap elements at indexes i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Sattolo's shuffle algorithm
function shuffleSandra(array: any[]) {
  // Loop through array
  for (let i = 0; i < array.length; i++) {
    // Generate a random index from 0 to the last index
    let j = Math.floor(Math.random() * array.length);

    // Swap elements at indexes i and j if they are not the same
    if (i !== j) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  return array;
}

export function shuffle(array: any[], variation: 'sattolo' | 'fisher-yates' | 'durstenfeld' | 'inside-out' = 'inside-out') {
  switch (variation) {
    case 'sattolo':
      return shuffleSandra(array);
    case 'fisher-yates':
      return shuffleFisherYates(array);
    case 'durstenfeld':
      return shuffleDurstenfeld(array);
    case 'inside-out':
      return shuffleInsideOut(array);
    default:
      return shuffleFisherYates(array);
  }
}