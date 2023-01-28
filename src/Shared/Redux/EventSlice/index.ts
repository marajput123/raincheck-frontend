import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IEvent } from 'src/Shared/Models/IEvent'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<IEvent, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi