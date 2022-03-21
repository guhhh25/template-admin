import useAuth from '../../data/hook/UseAuth'
import { IconeAjustes, IconeCasa, IconeLogout, IconeNotificacao } from '../icons'
import Logo from './Logo'
import MenuItem from './MenuItem'

export default function MenuLateral(){

    const { logout } = useAuth()

    return(

        

        <aside className={`flex flex-col
        
                            bg-gray-200 text-black-200
                           dark:bg-gray-900 dark:text-gray-200  `}>
            <div className={`
            flex flex-col items-center justify-center
            h-20 w-20
            bg-gradient-to-r from-indigo-500 via to-purple-800`}>
                <Logo/>
            </div>

            <ul className={`flex-grow`}>
                <MenuItem url='./' texto='Home' icone={IconeCasa}/>
                <MenuItem url='./ajustes' texto='Opções' icone={IconeAjustes}/>
                <MenuItem url='./notificacoes' texto='Notificações' icone={IconeNotificacao}/>
            </ul>
            <ul className={``}>
                <MenuItem className={`text-red-600 dark:text-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white`} onClick={logout} texto='Logout' icone={IconeLogout}/>
                
               
            </ul>
        </aside>
    )
}