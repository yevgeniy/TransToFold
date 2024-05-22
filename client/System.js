import {useEffect, useState} from 'react';


const System={}

let Lists=[]
const addList=(fn)=> {
    Lists.push(fn);
    return ()=> {
        Lists=Lists.filter(v=>v!==fn);
    }
}

export function useSelect(fn) {
    const res=fn(System);
    const [r,setr]=useState(+new Date());


    useEffect(()=> {
        const c=addList(()=> {
            setr(+new Date());
        })

        return c;
    },[]);

    const update=(obj)=> {
        for(let i in obj)
            System[i]=obj[i];

        Lists.forEach(v=>v());
    }



    return [res, update];
}