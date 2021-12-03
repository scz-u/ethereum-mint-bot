import { Network } from "../constants";

export function getNetworkName(network: Network) {
    switch(network) {
        case Network.Mainnet:
            return "Mainnet";
        case Network.Goerli:
            return "Görli"
    }
}