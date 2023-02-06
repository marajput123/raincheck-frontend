import { useRef, useEffect } from "react"

interface IInfinitLoaderTriggerProps {
  onTriggerCallback: (observers: IntersectionObserverEntry[]) => void;
}

export const InfinitLoaderTrigger = (props: IInfinitLoaderTriggerProps) => {
  const { onTriggerCallback } = props;
  const loader = useRef<HTMLDivElement>()


  function intersectionCallback(observers: IntersectionObserverEntry[]) {
    onTriggerCallback(observers)
  }

  useEffect(() => {
    const intersection = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1
    });

    if (loader.current) {
      intersection.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        intersection.unobserve(loader.current)
      }
    }
  }, []);

  return <div ref={loader} />
}

export const observerInView = (observers: IntersectionObserverEntry[]) => {
  if (observers && observers.length === 0) {
    return;
  }
  return observers[0].isIntersecting;
}