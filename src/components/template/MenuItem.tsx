import Link from 'next/link'

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    onClick?: (evento:any) => void
    className?: string
} 




export default function MenuItem(props:MenuItemProps){
   
    function RenderizarConteudo(){
        return(
            <a className={`flex flex-col justify-center items-center w-full h-20 w-20 ${props.className}
                           dark:text-gray-200`}>
            {props.icone}
            <span className={`text-xs font-dark text-gray-1000`}>
                {props.texto}
            </span>
            </a>
        )
    }
   
    return(
        <li onClick={props.onClick} className={`hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-800`}>
            {props.url ? (
                <Link href={props.url}>
                {RenderizarConteudo()}
            </Link>
            ) : (
                RenderizarConteudo()  
            ) }
            

            
        </li>
    )
}