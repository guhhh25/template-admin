import { iconeLua, IconeSol } from "../icons"

interface BotaoAlternarTemaProps{
    tema: string
    alternarTema: () => void
}

export default function BotaoAlternarTema(props:BotaoAlternarTemaProps){
    return props.tema === 'dark' ? (

        <div onClick={props.alternarTema} className={`sm:flex items-center hidden bg-gradient-to-r from-yellow-300 to-yellow-600
                                                      w-16 lg:w-28 h-9  cursor-pointer p-1 rounded-full`}>
            <div className={`flex items-center justify-center bg-white text-yellow-600 w-6 h-6 rounded-full`}>
                {IconeSol(5)}
            </div>
            <div className={` hidden lg:flex items-center ml-4 text-white `}>
                <span className="text-sm">Claro</span>
            </div>

        </div>

    )  : (
        <div onClick={props.alternarTema} className={`sm:flex justify-end
        hidden bg-gradient-to-r from-gray-500 to-gray-900
        w-16 lg:w-28 h-9 cursor-pointer p-1 rounded-full                                              `}>


<div className={`hidden lg:flex items-center justify-end mr-2 text-gray-300 `}>
                <span className="text-sm">Escuro</span>
            </div>

            <div className={`flex items-center justify-center bg-black text-yellow-300 w-6 h-6 rounded-full`}>
                {iconeLua}
            </div>
           

        </div>

    )

    
}