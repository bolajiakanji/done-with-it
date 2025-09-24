import { useState } from "react"
import ErrorContext from "../context/error"

const ErrorMessage = ({children}) => {
    const [error, setError] = useState('gsssns')

    return (
    <ErrorContext.Provider value={{ error, setError }} >
        {children}
    </ErrorContext.Provider>
    )
}

export default ErrorMessage