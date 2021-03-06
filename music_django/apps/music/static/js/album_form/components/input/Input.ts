import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Field } from '../../app.types';
import templates from "./templates";
import InputLabel from './InputLabel';
import InputErrors from './InputErrors';

@Component({
    name: 'Input',
    components: {InputLabel, InputErrors}
})
export default class Input extends Vue {
    @Prop()
    name!: string;

    @Prop()
    field!: Field;

    @Prop()
    initial!: any;

    @Prop()
    errors?: [];

    @Prop({ default: false })
    multiSelect!: boolean;

    // DATA
    binding: any = '';

    // COMPUTED
    get InputTemplate() {
        switch(this.fieldType) {
            case 'checkbox':
                return templates.checkbox;
            case 'field':
                return  templates.select;
            default:
                return templates.standard;
        }

    }

    get fieldType() {
        switch (this.field.type) {
            case 'string':
                return 'text';
            case 'integer':
                return 'number';
            case 'boolean':
                return 'checkbox';
            default:
                return this.field.type;
        }
    }

    @Watch('binding')
    onChangeValue(value: any) {
        this.$emit('on-change', this.name, value);
    }

    // METHODS
    created() {
        this.binding = this.initial;
        this.$options.template = this.InputTemplate;
    }


}
