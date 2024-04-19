import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts";
import { Grid, Robot } from "./types.ts";
import { moveRobots } from "./robotMovements.ts";

const testGrid: Grid = { maxX: 1, maxY: 1 };
const largeTestGrid = { maxX: 4, maxY: 8 };

Deno.test({
  name: "Robot can rotate clockwise",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "R", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "E", commands: "R", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can rotate anti-clockwise",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "L", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "W", commands: "L", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can rotate past 360 degrees",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "RRRRRR", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "S", commands: "RRRRRR", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can move forward",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "F", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 1, direction: "N", commands: "F", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can move right within grid",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "RF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 1, y: 0, direction: "E", commands: "RF", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can move left within grid",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 1, y: 0, direction: "N", commands: "LF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "W", commands: "LF", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot is lost when moving off grid: x negative",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "LF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "W", commands: "LF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot is lost when moving off grid: y negative",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "LLF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 0, direction: "S", commands: "LLF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot is lost when moving off grid: x too large",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "RFF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 1, y: 0, direction: "E", commands: "RFF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot is lost when moving off grid: y too large",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "FF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 1, direction: "N", commands: "FF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Further commands are ignored when robot is lost",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "FFFFFFLLFF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 0, y: 1, direction: "N", commands: "FFFFFFLLFF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "Robot can move to grid boundaries without getting lost",
  fn() {
    const grid: Grid = testGrid;
    const robots: Robot[] = [
      { x: 0, y: 0, direction: "N", commands: "FRF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 1, y: 1, direction: "E", commands: "FRF", isLost: false },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "multiple robots move according to example 1",
  fn() {
    const grid: Grid = largeTestGrid;
    const robots: Robot[] = [
      { x: 2, y: 3, direction: "E", commands: "LFRFF", isLost: false },
      { x: 0, y: 2, direction: "N", commands: "FFLFRFF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 4, y: 4, direction: "E", commands: "LFRFF", isLost: false },
      { x: 0, y: 4, direction: "W", commands: "FFLFRFF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});

Deno.test({
  name: "multiple robots move according to example 2",
  fn() {
    const grid: Grid = largeTestGrid;
    const robots: Robot[] = [
      { x: 2, y: 3, direction: "N", commands: "FLLFR", isLost: false },
      { x: 1, y: 0, direction: "S", commands: "FFRLF", isLost: false },
    ];

    const result = moveRobots(grid, robots);

    const expectedRobots: Robot[] = [
      { x: 2, y: 3, direction: "W", commands: "FLLFR", isLost: false },
      { x: 1, y: 0, direction: "S", commands: "FFRLF", isLost: true },
    ];
    assertEquals(result, expectedRobots);
  },
});
