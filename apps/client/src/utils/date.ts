import dayjs, { extend } from "dayjs";
import dayjsCustomParseFormat from "dayjs/plugin/customParseFormat";

// import dayjsDevHelper from "dayjs/plugin/devHelper";

extend(dayjsCustomParseFormat);
// https://github.com/iamkun/dayjs/issues/2760
// extend(dayjsDevHelper);

export { dayjs };
