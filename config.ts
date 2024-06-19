export const config = {
  gateway: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    grantType: "2",
    apiURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    systemURL: process.env.NEXT_PUBLIC_API_SYSTEM_URL,
    skuMethod: process.env.NEXT_PUBLIC_SKU_METHOD,
    apiEndPoint1: process.env.NEXT_PUBLIC_V1_API,
    apiEndPoint2: process.env.NEXT_PUBLIC_V2_API,
  },
};
