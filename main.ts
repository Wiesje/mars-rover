import { formatOutput, readInput } from "./io.ts";
import { moveRobots } from "./robotMovements.ts";

const { grid, robots } = await readInput("input.txt");

const results = moveRobots(grid, robots);

const formattedResults = results.map(formatOutput).join("\n");
console.log(formattedResults);
