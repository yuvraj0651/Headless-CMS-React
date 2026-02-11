import { useEffect, useState } from "react"

const Counter = ({ target, duration = 800 }) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const intervalTime = 20;
        const totalSteps = duration / intervalTime;
        const increment = Math.ceil(target / totalSteps);

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(start);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [target, duration]);

    return (
        <>
            <span>{count.toLocaleString("en-IN")}</span>
        </>
    )
}

export default Counter