import {useEffect, useRef} from "react";

export const useDocumentTitle = (title: string, prevailOnDismount=false) => {
  const previousDocumentTitle = useRef(document.title);
  useEffect(() => {
    document.title = `Event App | ${title}`;
    return () => {
      if(!prevailOnDismount){
        document.title = previousDocumentTitle.current
      }
    }
  }, [])
}