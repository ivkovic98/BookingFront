export const parseResponse = async (response: any) => {
  if (response.status != 200) {
    var data = await response.json();
    throw new Error(`Status: ${response.status}, Message: ${data.message}`);
  } else {
    try {
      var result = await response.json();
      return result;
    } catch {
      return true;
    }
  }
};
