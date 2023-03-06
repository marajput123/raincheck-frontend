import {useEffect, useRef} from "react"
import { QueryFunction, useInfiniteQuery } from "react-query";
import { observerInView } from "src/Shared/Components/InfiniteLoader";
import { IServerResponse } from "src/Shared/Models/IServerResponse";

export const useCustomInfiniteQuery = <T extends any>(queryKey: string | string[], queryFunction: QueryFunction<IServerResponse<T>>, initialPage = 1) => {
  const query = useInfiniteQuery(
    queryKey,
    queryFunction, {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1 
      }
    }
  );
  const currentPage = useRef(query?.data?.pages.length || 0);

  useEffect(() => {
    currentPage.current = query?.data?.pages.length;
  }, [query?.data])

  const onInfiniteTrigger = (observers: IntersectionObserverEntry[]) => {
    const isScrollEnd = !query.data?.pages[0]?.metadata?.totalCount || (currentPage.current * 10) >= query.data?.pages[0]?.metadata?.totalCount;
    if (!observerInView(observers) || isScrollEnd) {
      return;
    }

    currentPage.current += 1;
    query.fetchNextPage();
  };

  return {...query, onInfiniteTrigger}
}