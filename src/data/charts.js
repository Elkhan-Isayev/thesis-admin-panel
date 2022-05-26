
import { faSadTear, faSmile, faSkull } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Detractors", value: 31, color: "danger", icon: faSadTear },
    { id: 2, label: "Passives", value: 29, color: "primary", icon: faSkull },
    { id: 3, label: "Promoters", value: 38, color: "tertiary", icon: faSmile }
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

export {
    trafficShares,
    totalOrders
};