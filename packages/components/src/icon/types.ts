import {ExtractPropTypes} from "vue";

export const iconProps = {
    icon: {
        type: String,
        require: true,
        default: () => {
            return '';
        }
    },
    size: {
        type: String,
        require: false,
        default: () => {
            return '';
        }
    },
    color: {
        type: String,
        require: false,
        default: () => {
            return '';
        }
    }
}

export type IconProps = ExtractPropTypes<typeof iconProps>;