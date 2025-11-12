import on from '../assets/on.png';
import off from '../assets/off.png';
export function getOnOffImage(id) {
    switch (id) {
        case 0:
            return on;
        case 1:
            return off;
    }
}