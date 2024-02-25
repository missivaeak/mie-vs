import * as React from 'react';
import GlobalContext from './src/contexts/GlobalContext';
import Navigation from './src/navigation/Navigation';
import GlobalContextType from './src/types/GlobalContextType';

const App = () => {
  const [ globalState, setGlobalState ] = React.useState({
    database: null,
    spinnerActive: false
  })

  return (
    <>
      <GlobalContext.Provider value={{globalState, setGlobalState} as GlobalContextType}>
        <Navigation />
      </GlobalContext.Provider>
    </>
  )
}

export default App
