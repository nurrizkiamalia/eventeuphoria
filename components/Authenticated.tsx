"use client";

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Authenticated = ({children, route}: {children: React.ReactNode, route: string}) => {
    const { isAuthenticated, currentUser, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isLoading){
            if(isAuthenticated){
                router.push('/');
            } else if (currentUser?.role === 'ORGANIZER'){
                router.push('/dashboard')
            } else {
                router.push(`/${route}`)
            }
        }
    })

    if(isLoading || isAuthenticated || currentUser?.role === 'ORGANIZER'){
        return <p>Loading...</p>;
    }

    return(
        <>
        {children}
        </>
    )
}

export default Authenticated