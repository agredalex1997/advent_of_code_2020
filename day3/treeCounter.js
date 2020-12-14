exports.treeCounter = (map, movement) => {
  let treeCount = 0;

  const { right, down } = movement;

  let position = 0;

  for (let i = down; i < map.length; i += down) {
    const line = map[i];

    if (position + right <= line.length - 1) {
      position += right;
    } else {
      position = right - (line.length - position);
    }

    const isTree = line.charAt(position) === '#';
    if (isTree) treeCount++;
  }

  return treeCount;
}
