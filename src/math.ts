const limit = 100;

export function getMandlebrotInclusion(
  c: number,
  ci: number,
  iterations: number
): number {
  let z = 0;
  let zi = 0;

  /**
   * This area is always stable
   */
  if (c < 0.25 && c > -0.6 && ci < 0.4 && ci > -0.4) {
    return 0;
  }

  for (let i = 0; i < iterations; i++) {
    const newZ = z * z - zi * zi + c;
    const newZi = 2 * zi * z + ci;

    z = newZ;
    zi = newZi;

    if (z * z * zi * zi > limit) {
      return Math.round((i / iterations) * 100);
    }
  }

  return 0;
}
