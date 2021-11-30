const createRange = (start, end, step) => {
    let range = [];
    if (start === end) return range.push(start);
    for (let i = start; i <= end; i += step) {
      range.push(i);
    }
    return range;
  };