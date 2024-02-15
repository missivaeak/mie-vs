import { createContext } from 'react';
import type GlobalContextType from '../types/GlobalContextType';

const GlobalContext = createContext({
    globalState: null,
    setGlobalState: () => undefined
} as GlobalContextType)

export default GlobalContext
