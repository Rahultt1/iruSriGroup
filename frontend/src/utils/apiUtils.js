// import axios from 'axios';

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// export const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
//   let retries = 0;
//   while (retries < maxRetries) {
//     try {
//       const response = await axios(url, options);
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         retries++;
//         console.log(`Rate limited. Retrying in ${2 ** retries} seconds...`);
//         await delay(2 ** retries * 1000);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Max retries reached');
// };