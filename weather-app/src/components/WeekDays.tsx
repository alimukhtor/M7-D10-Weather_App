import { Daily } from "./types/forecast";

interface IDays{
    detail:Daily,
    index:number
}


const WeekDays =({detail, index}:IDays)=> {

    return(
        <h1>Days</h1>
    )
}
export default WeekDays;