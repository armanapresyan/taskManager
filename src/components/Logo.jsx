import taskImg from "../img/task.png"

export default function Logo(){
    return(
        <div className="bg-white rounded-xl flex justify-center h-[12%]">
          <img src={taskImg} className="w-[120px]"/>
        </div>
    )
}