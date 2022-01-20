import React from "react";
import Countup, {useCountUp} from 'react-countup';

function CountUp(props){
    return(
        <Countup end={props.end} duration={3} delay={1} prefix={props.prefix} separator={","} decimals={props.decimals}></Countup>
    )
}
export default CountUp;