/* Example in Node.js */
const axios = require("axios");

module.exports = {
  getQuotes: async function () {
    let response = null;
    const result = new Promise(async (resolve, reject) => {
      try {
        response = await axios.get(process.env.URL_MARKET_COIN_CAP, {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.API_TOKEN_MARKET_COIN_CAP,
          },
        });
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        //console.log(json);
        resolve(json);
      }
    });
    return result;
  },
};
