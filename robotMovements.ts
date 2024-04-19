import { directions, Grid, Robot } from "./types.ts";

function moveRobots(grid: Grid, robots: Robot[]): Robot[] {
  for (const robot of robots) {
    for (const command of robot.commands) {
      switch (command) {
        case "F":
          moveForward(robot);
          break;
        case "L":
          rotate(robot, -1);
          break;
        case "R":
          rotate(robot, 1);
          break;
      }

      if (
        robot.x > grid.maxX ||
        robot.y > grid.maxY ||
        robot.x < 0 ||
        robot.y < 0
      ) {
        robot.isLost = true;
        moveForward(robot, -1);
        break;
      }
    }
  }
  return robots;
}

function moveForward(robot: Robot, stepSize: number = 1) {
  switch (robot.direction) {
    case "N":
      robot.y += stepSize;
      break;
    case "S":
      robot.y -= stepSize;
      break;
    case "E":
      robot.x += stepSize;
      break;
    case "W":
      robot.x -= stepSize;
      break;
  }
}

function rotate(robot: Robot, rotation: number) {
  const currentDirectionIndex = directions.indexOf(robot.direction);
  const rotatedDirectionIndex = (currentDirectionIndex + rotation + 4) % 4;
  robot.direction = directions[rotatedDirectionIndex];
}

export { moveRobots };
