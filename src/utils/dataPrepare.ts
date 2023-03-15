function escapeHtml(unsafe: unknown): string {
  return `${unsafe}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function getFormData(data: FormData): Record<string, unknown> {
  const returnObj: Record<string, unknown> = {};
  data.forEach(function (value, key) {
    returnObj[key] = escapeHtml(value);
  });

  return returnObj;
}

function dataToJSON(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

export { getFormData, dataToJSON };
