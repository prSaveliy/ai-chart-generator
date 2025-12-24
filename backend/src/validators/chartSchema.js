const chartSchema = {
  type: "object",
  required: ["data", "layout"],
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        required: ["x", "y", "type"],
        properties: {
          x: { type: "array", items: { type: "number" } },
          y: { type: "array", items: { type: "number" } },
          type: { type: "string", enum: ["scatter", "bar", "line"] },
          mode: { type: "string" }
        }
      }
    },
    layout: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" }
      }
    }
  },
  additionalProperties: false
};

export default chartSchema;