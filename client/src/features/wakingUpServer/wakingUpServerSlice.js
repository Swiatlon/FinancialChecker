import apiSlice from '../api/apiSlice';

export const wakingUpServerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    wakeUp: builder.mutation({
      query: () => ({
        url: '/wakeUp',
        method: 'GET',
      }),
    }),
  }),
});

export const { useWakeUpMutation } = wakingUpServerSlice;
