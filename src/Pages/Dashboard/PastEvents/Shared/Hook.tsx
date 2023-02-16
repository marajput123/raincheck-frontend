import {useRef} from "react"
import { QueryFunction, useInfiniteQuery } from "react-query";
import { observerInView } from "src/Shared/Components/InfiniteLoader";
import { IServerResponse } from "src/Shared/Models/IServerResponse";

export const useCustomInfiniteQuery = <T extends any>(queryKey: string | string[], queryFunction: QueryFunction<IServerResponse<T>>, initialPage = 1) => {
  const pageRef = useRef(1);

  const query = useInfiniteQuery(
    queryKey,
    queryFunction
  );

  const onInfiniteTrigger = (observers: IntersectionObserverEntry[]) => {
    const isScrollEnd = (pageRef.current * 10) >= query.data?.pages[0]?.metadata?.totalCount
    if (!observerInView(observers) || isScrollEnd) {
      return;
    }
    pageRef.current += 1
    query.fetchNextPage({ pageParam: pageRef.current });
  };

  return {...query, onInfiniteTrigger}
}