const DEFAULT_MAX_ITERATIONS = 10;
const DEFAULT_TOLERANCE = 1e-10; // = 1/10_000_000_000

/**
 * Computes the continued fraction coefficients [a_0, a_1, ..., a_n] for a
 * **non-negative** finite number
 *
 * @see {@link https://en.wikipedia.org/wiki/Simple_continued_fraction}
 */
const getContinuedFraction = (
  value: number,
  maxIterations = DEFAULT_MAX_ITERATIONS,
  tolerance = DEFAULT_TOLERANCE,
): number[] => {
  const coefficients: number[] = [];
  let remainder = value;

  for (let i = 0; i < maxIterations; i++) {
    const integerPart = Math.floor(remainder);
    const fractionalPart = remainder - integerPart;
    coefficients.push(integerPart);

    // The remainder is negligible — there exists a sufficiently close rational
    // representation.
    if (Math.abs(fractionalPart) < tolerance) {
      break;
    }

    // Reciprocal of the fractional part becomes the next coefficient
    remainder = 1 / fractionalPart;
  }

  return coefficients;
};

type RationalObject = {
  numerator: number;
  denominator: number;
};

/**
 * Converts a list of continued-fraction coefficients [a₀, a₁, …, aₙ] back
 * into a rational p/q by evaluating the convergents from the tail inward
 *
 * The recurrence is:
 *   h_n = a_n,  h_{i} = a_i · h_{i+1} + h_{i+2}   (numerators)
 *   k_n = 1,    k_{i} = a_i · k_{i+1} + k_{i+2}   (denominators)
 */
const convergentFromCoefficients = (coefficients: number[]): RationalObject => {
  if (coefficients.length === 0) {
    throw new RangeError(
      "Cannot build a convergent from an empty coefficient list.",
    );
  }

  const convergent = coefficients.toReversed().reduce<[number, number]>(
    ([numerator, denominator], coefficient, index) => {
      // First element (original a_n) initializes the first convergent
      if (index === 0) {
        return [coefficient, 1];
      }

      return [coefficient * numerator + denominator, numerator];
    },
    [0, 1], // dummy initialValue, overridden on first iteration
  );

  return { numerator: convergent[0], denominator: convergent[1] };
};

/**
 * Approximates a finite real number as a rational p/q using the continued
 * fractions.
 *
 * The returned fraction always has a positive denominator, and the sign of the
 * input is carried by the numerator.
 */
const approximateRational = (
  value: number,
  maxIterations = DEFAULT_MAX_ITERATIONS,
  tolerance = DEFAULT_TOLERANCE,
): RationalObject => {
  if (!Number.isFinite(value)) {
    throw new RangeError(
      `value must be a finite number, but received: ${value}`,
    );
  }
  if (!Number.isInteger(maxIterations) || maxIterations < 1) {
    throw new RangeError(
      `maxIterations must be a positive integer, but received: ${maxIterations}`,
    );
  }

  if (value < 0) {
    const rational = approximateRational(-value, maxIterations, tolerance);
    return {
      numerator: -rational.numerator,
      denominator: rational.denominator,
    };
  }

  const coefficients = getContinuedFraction(value, maxIterations, tolerance);

  return convergentFromCoefficients(coefficients);
};

export { approximateRational };
