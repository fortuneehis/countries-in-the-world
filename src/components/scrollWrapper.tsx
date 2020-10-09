import React, {useCallback, useRef} from 'react';


interface PaginatorProps {
    hasMore: boolean,
    children: ()=> any
}

//Paginator Wrapper
export const Paginator : React.FC<PaginatorProps> = ({hasMore, children})=>{
    const observer = useRef<any>()
    const paginatorRef = useCallback(node=>{
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
                if(entries[0].isIntersecting && hasMore){
                    children()
                }
        })
        if(node) observer.current.observe(node)
    },[hasMore])
    
    return (
        <div ref={paginatorRef}></div>
    );
}

