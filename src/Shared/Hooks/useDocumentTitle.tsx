import {useEffect, useRef} from "react";

export const useDocumentTitle = (title: string, prevailOnDismount=false) => {
  const previousDocumentTitle = useRef(document.title);
  useEffect(() => {
    document.title = `Evntful | ${title}`;
    return () => {
      if(!prevailOnDismount){
        /* eslint-disable react-hooks/exhaustive-deps */
        document.title = previousDocumentTitle.current
      }
    }
  }, [title, prevailOnDismount])
}