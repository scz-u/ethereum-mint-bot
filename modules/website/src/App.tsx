import React from 'react'
import Title from './components/atoms/Title'
import SearchBar from './components/organisms/SearchBar'
import ContractContext, { defaultContractContext } from './context/ContractContext';


function App() {

  const search= (query: string) => {
    console.log(query);
  }

    return (
      <ContractContext.Provider value={defaultContractContext} >
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>

          <Title/>
          <div style={{border: "2px solid black", borderRadius: "5px", padding: "5px", margin: "20px", display: "flex", width: "min-content"}}>

          <SearchBar placeholder="Enter Contract Address" label="Enter Contract Address" onSubmit={search}/>
          </div>


        </div>
        </ContractContext.Provider>
    )
}

export default App
