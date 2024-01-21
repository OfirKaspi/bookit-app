import { ReactNode, createContext, useContext, useState } from "react"
import { Toast } from "../cmps/Toast"
import { useQuery } from "react-query"
import { loadStripe, Stripe } from "@stripe/stripe-js"
import { validateToken } from "../services/user.service"

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ''

type ToastMessage = {
    message: string
    type: 'SUCCESS' | 'ERROR'
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void
    isLoggedIn: boolean
    stripePromise: Promise<Stripe | null>
}

const AppContext = createContext<AppContext | undefined>(undefined)

const stripePromise = loadStripe(STRIPE_PUB_KEY)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

    const { isError } = useQuery('validateToken', validateToken, {
        retry: false
    })

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            isLoggedIn: !isError,
            stripePromise
        }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as AppContext
}