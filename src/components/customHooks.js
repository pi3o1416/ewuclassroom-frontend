import {useEffect, useState, useRef} from "react";

const useDocTitle = title => {
    const [doctitle, setDocTitle] = useState(title);
    useEffect(() => {
        document.title = doctitle;
    }, [doctitle]);
    return [doctitle, setDocTitle];
};


const useJwtToken = (fn, inputs) => {
    const initialRender = useRef(true)
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            return fn()
        }
    }, [inputs])
}





export {useDocTitle, useJwtToken};

