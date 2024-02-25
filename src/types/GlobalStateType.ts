import Database from "../services/Database"

type GlobalStateType = {
    database: Database | null
    spinnerActive: boolean
}

export default GlobalStateType
