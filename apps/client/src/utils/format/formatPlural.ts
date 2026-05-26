type PluralRules = {
  other: string;
} & Partial<Record<Intl.LDMLPluralRule, string>>;

const formatPlural = (
  num: number,
  pluralRules: PluralRules,
  locales?: Intl.LocalesArgument,
  options?: Intl.PluralRulesOptions & Intl.NumberFormatOptions,
) => {
  const pluralRulesInstance = new Intl.PluralRules(locales, options);
  const suffix =
    pluralRules[pluralRulesInstance.select(num)] ?? pluralRules.other ?? "";

  return `${num.toLocaleString(locales, options)}${suffix}`;
};

export { formatPlural, type PluralRules };
