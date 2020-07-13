
function shouldResize(event) {
  return event.target.dataset.resize;
}

function shouldSelected(event) {
  return event.target.dataset.id;
}

function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => index + start);
}

function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.column, target.column);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export {shouldResize, shouldSelected, matrix};
