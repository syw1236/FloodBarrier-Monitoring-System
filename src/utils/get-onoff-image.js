import on from '/on.png';
import off from '/off.png';
export function getOnOffImage(id) {
    switch (id) {
        case 0:
            return off;
        case 1:
            return on;
    }
}