type PluralRules = {
  other: string;
} & Partial<Record<Intl.LDMLPluralRule, string>>;

const parseFormatPluralOptions = (
  options?: Intl.PluralRulesOptions & Intl.NumberFormatOptions,
): [
  Intl.PluralRulesOptions | undefined,
  Intl.NumberFormatOptions | undefined,
] => {
  if (options === undefined) {
    return [options, options];
  }
  const {
    localeMatcher,
    type,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
    roundingPriority,
    roundingIncrement,
    roundingMode,
    ...numberFormatOptions
  } = options;

  const pluralRulesOptions: Intl.PluralRulesOptions = {
    localeMatcher,
    type,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
  };

  return [
    pluralRulesOptions,
    {
      ...numberFormatOptions,
      localeMatcher,
      minimumIntegerDigits,
      minimumFractionDigits,
      maximumFractionDigits,
      minimumSignificantDigits,
      maximumSignificantDigits,
      roundingPriority,
      roundingIncrement,
      roundingMode,
    },
  ];
};

const formatPlural = (
  num: number,
  pluralRules: PluralRules,
  locales?: Intl.LocalesArgument,
  options?: Intl.PluralRulesOptions & Intl.NumberFormatOptions,
) => {
  const [pluralRulesOptions, numberFormatOptions] =
    parseFormatPluralOptions(options);
  const pluralRulesInstance = new Intl.PluralRules(locales, pluralRulesOptions);
  const suffix =
    pluralRules[pluralRulesInstance.select(num)] ?? pluralRules.other ?? "";

  return `${num.toLocaleString(locales, numberFormatOptions)}${suffix}`;
};

export { formatPlural, type PluralRules };
