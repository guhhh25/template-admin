
import { Router, useRouter } from 'next/router'
import { userInfo } from 'os'
import { createContext, useEffect, useState } from 'react'
import Usuario from '../../model/Usuario'
import firebase from './../../firebase/config'
import Cookies from 'js-cookie'


interface AuthContextProps {
    usuario: Usuario
    carregando?: boolean
    loginGoogle: () => Promise<void>
    logout: () => Promise<void>
    login?: (email, senha) => Promise<void>
    cadastrar?: (email, senha) => Promise<void>
}



const AuthContext = createContext<AuthContextProps>({})



async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken
    return{
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL,
    }
}

function gerenciarCookie(logado: boolean){
    if(logado){
        Cookies.set('admin-template-auth', logado, {
            expires: 7
        })
    }   else{
        Cookies.remove('admin-template-auth')
    }
}


export function AuthProvider(props){
    const route = useRouter()
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

   async function configurarSessao(usuarioFirebase){
        if(usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        }else{
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }


    async function login(email, senha){
        try{
        const resp = await firebase.auth().signInWithEmailAndPassword(email,senha)
        await configurarSessao(resp.user)
        route.push('/')
        }finally{
            setCarregando(false)
        }
         
       }

       async function cadastrar(email, senha){
        try{
        const resp = await firebase.auth().createUserWithEmailAndPassword(email,senha)
        await configurarSessao(resp.user)
        route.push('/')
        }finally{
            setCarregando(false)
        }
         
       }

    async function loginGoogle(){
        try{
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        ) 
        configurarSessao(resp.user)
        route.push('/')
        }finally{
            setCarregando(false)
        }
         
       }

       async function logout(){
        try{
        setCarregando(true)
        await firebase.auth().signOut()
        await configurarSessao(null)
        }finally{
            setCarregando(false)
        }
       }

       useEffect(() =>{
       const cancel =  firebase.auth().onIdTokenChanged(configurarSessao)
       return () => cancel()
       },[])


    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            logout,
            login,
            cadastrar
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext