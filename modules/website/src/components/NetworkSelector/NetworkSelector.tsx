import { Select } from '@chakra-ui/select'
import React, { useContext } from 'react'
import { getNetworkName } from '../../utils/getNetworkName';
import { Network } from '../../constants'
import ContractContext from '../../context/ContractContext';

export default function NetworkSelector() {
    const {chainId, setChainId} = useContext(ContractContext);

    return (
        <Select placeholder="Select a network" value={chainId} onChange={(e) => setChainId(Number(e.target.value) as Network)}>
            <option value={Network.Mainnet}>{getNetworkName(Network.Mainnet)}</option>
            <option value={Network.Goerli}>{getNetworkName(Network.Goerli)}</option>
        </Select>
    )
}
