export default function Logo(){
    return(
        <div className={`
            items-center
            justify-center
            flex flex-col
            bg-white rounded-full
            h-14 w-14
        `}>

        <div className={`
        mb-0.5
        h-3 w-3 rounded-full bg-red-600
        `}/>
        
        <div className="flex mt-0.5">
        <div className={`
        h-3 w-3 rounded-full bg-green-600 mr-0.5
        `}/>
        <div className={`
        ml-0.5
        h-3 w-3 rounded-full bg-blue-600
        `}/>
        </div>
        

        </div>

        
    )
}