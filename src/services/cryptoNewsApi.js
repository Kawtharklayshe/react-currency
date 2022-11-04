import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-key': '1d083b182emshd6fdd79eb5b76f2p17da24jsn7da5d94e31ff',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl:'https://bing-news-search1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
        query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      }),
  
    
    }),
  });





  export const { useGetCryptoNewsQuery } = cryptoNewsApi;