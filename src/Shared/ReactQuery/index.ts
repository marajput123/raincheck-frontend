import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // retryDelay: 60000 // one minute
            retry: true
        }
    }
})

