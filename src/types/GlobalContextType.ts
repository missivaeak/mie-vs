import { Dispatch, SetStateAction } from "react"
import GlobalStateType from "./GlobalStateType"

type GlobalContextType = {
    globalState: GlobalStateType

    setGlobalState: Dispatch<SetStateAction<GlobalStateType>>
}

export default GlobalContextType