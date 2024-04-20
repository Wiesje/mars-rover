import { Direction, Grid, Robot } from "./types.ts";

// Reads the input from a file.
// Could add more validation e.g. maxX and maxY should be positive integers, direction string should be a valid Direction.
async function readInput(
  inputFilePath: string,
): Promise<{ grid: Grid; robots: Robot[] }> {
  const data = await Deno.readTextFile(inputFilePath);

  const lines = data.split("\n");
  const [maxX, maxY] = lines[0].split(" ").map(Number);
  const grid: Grid = { maxX, maxY };

  const robots: Robot[] = [];
  lines.slice(1).forEach((line) => {
    const [position, commandSequence] = line.split(") ");
    const [x, y, direction] = position.substring(1).split(", ");
    const robot: Robot = {
      x: parseInt(x),
      y: parseInt(y),
      direction: direction as Direction,
      commands: commandSequence,
      isLost: false,
    };
    robots.push(robot);
  });

  return { grid, robots };
}

function formatOutput(robot: Robot): string {
  let output = `(${robot.x}, ${robot.y}, ${robot.direction})`;
  if (robot.isLost) {
    output += " LOST";
  }
  return output;
}

export { formatOutput, readInput };
