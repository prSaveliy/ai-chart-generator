import Ajv from "ajv";
import chartSchema from "./chartSchema.js";

const ajv = new Ajv();
const validate = ajv.compile(chartSchema);

export function validateChart(data) {
  const valid = validate(data);
  return {
    valid,
    errors: validate.errors
  };
}
