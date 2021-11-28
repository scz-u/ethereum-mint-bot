import React from "react";

export interface ContractContextType {

}

export const defaultContractContext: ContractContextType= {

}

const ContractContext = React.createContext<ContractContextType>(defaultContractContext);
export default ContractContext;