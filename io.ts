import { Grid, Robot } from "./types.ts";

function readInput(
  inputFilePath: string,
): Promise<{ grid: Grid; robots: Robot[] }> {
  return Deno.readTextFile(inputFilePath)
    .then((data) => {
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
          direction,
          commands: commandSequence,
          isLost: false,
        };
        robots.push(robot);
      });

      return { grid, robots };
    });
}

function formatOutput(robot: Robot): string {
  let output = `(${robot.x}, ${robot.y}, ${robot.direction})`;
  if (robot.isLost) {
    output += " LOST";
  }
  return output;
}

export { formatOutput, readInput };
