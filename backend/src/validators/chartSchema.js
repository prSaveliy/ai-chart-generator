const chartSchema = {
  type: "object",
  required: ["data", "layout"],
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        required: ["type"],
        properties: {
          type: { 
            type: "string", 
            enum: ["scatter", "bar", "line", "pie", "histogram", "histogram2dcontour"] 
          },
          name: { type: "string" },
          
          // scatter, bar, line, histogram
          x: { 
            type: "array", 
            items: { type: ["number", "string"] } 
          },
          y: { 
            type: "array", 
            items: { type: ["number", "string"] } 
          },
          
          // scatter
          mode: { 
            type: "string",
            enum: ["lines", "markers", "lines+markers", "none"]
          },
          
          // pie
          labels: { 
            type: "array", 
            items: { type: "string" } 
          },
          values: { 
            type: "array", 
            items: { type: "number" } 
          },
          
          // bubble charts
          marker: {
            type: "object",
            properties: {
              size: { 
                oneOf: [
                  { type: "number" },
                  { type: "array", items: { type: "number" } }
                ]
              },
              color: {
                oneOf: [
                  { type: "string" },
                  { type: "array", items: { type: ["string", "number"] } }
                ]
              },
              colorscale: { type: "string" },
              line: {
                type: "object",
                properties: {
                  color: { type: "string" },
                  width: { type: "number" }
                }
              }
            }
          },// histograms
          nbinsx: { type: "number" },
          nbinsy: { type: "number" },
          histnorm: { 
            type: "string",
            enum: ["", "percent", "probability", "density", "probability density"]
          },
          
          // 2D density plots
          z: { 
            type: "array",
            items: { 
              type: "array",
              items: { type: "number" }
            }
          },
          
          colorscale: { type: "string" },
          
          // for pie charts
          hole: { type: "number" },
          textposition: { type: "string" },
          textinfo: { type: "string" },
          
          opacity: { type: "number" },
          text: { 
            type: "array", 
            items: { type: "string" } 
          }
        }
      }
    },
    layout: {
      type: "object",
      properties: {
        title: {
          oneOf: [
            { type: "string" },
            {
              type: "object",
              properties: { 
                text: { type: "string" },
                font: {
                  type: "object",
                  properties: {
                    size: { type: "number" },
                    color: { type: "string" }
                  }
                }
              }
            }
          ]
        },
        xaxis: {
          type: "object",
          properties: {
            title: {
              oneOf: [
                { type: "string" },
                {
                  type: "object",
                  properties: { text: { type: "string" } }
                }
              ]
            },
            type: { type: "string" },
            range: { 
              type: "array",
              items: { type: "number" }
            }
          }
        },
        yaxis: {
          type: "object",
          properties: {
            title: {
              oneOf: [
                { type: "string" },
                {
                  type: "object",
                  properties: { text: { type: "string" } }
                }
              ]
            },
            type: { type: "string" },
            range: { 
              type: "array",
              items: { type: "number" }
            }
          }
        },
        showlegend: { type: "boolean" },
        height: { type: "number" },
        width: { type: "number" },
        margin: {
          type: "object",
          properties: {
            l: { type: "number" },
            r: { type: "number" },
            t: { type: "number" },
            b: { type: "number" }
          }
        },
        paper_bgcolor: { type: "string" },
        plot_bgcolor: { type: "string" }
      }
    }
  },
  additionalProperties: false
};

export default chartSchema;