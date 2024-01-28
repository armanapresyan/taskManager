import LeftSide from "./LeftSIde";
import Tasks from "./Tasks";


export default function TaskUser(){
    return(
        <div className="flex flex-col  h-full sm:flex-row  sm:w-full">
            <LeftSide/>
            <Tasks/>
        </div>
    )
}