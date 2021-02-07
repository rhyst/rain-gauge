export const bin = (items, duration = 3, denomination = "hours") => {
  let noToBin = 1;
  switch (denomination) {
    case "minutes":
      noToBin = Math.round(duration / 15);
      break;
    case "hours":
      noToBin = 4 * duration;
      break;
    case "days":
      noToBin = 96 * duration;
      break;
  }
  let binned = [];
  for (let i = 0; i < items.length; i) {
    const slice = items.slice(i, i + noToBin);
    binned.push({
      ...slice[0],
      value: slice.reduce((a, c) => a + c.value, 0),
    });
    i = i + noToBin;
  }
  return binned;
};

export const normalise = (items, duration, denomination) =>
  bin(items, duration, denomination)
    .map((item) => ({
      y: item.value,
      x: item.dateTime,
    }))
    .reverse();
