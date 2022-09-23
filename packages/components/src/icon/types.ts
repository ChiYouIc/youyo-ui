import {ExtractPropTypes} from "vue";

export const iconProps = {
    icon: {
        type: String,
        require: true,
        default: () => ''
    },
    size: {
        type: String,
        require: false,
        default: () => ''
    },
    color: {
        type: String,
        require: false,
        default: () => ''
    },
    cursor: {
        type: String,
        require: false,
        default: () => 'pointer'
    }
}

export const iconPicker = {
    icon: {
        type: String,
        require: true,
        default: () => ''
    },
    disabled: {
        type: Boolean,
        required: false,
        default: () => false
    }
}

export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconPicker = ExtractPropTypes<typeof iconPicker>;