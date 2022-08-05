import { PropType } from "vue";

export default function <T>(
  defaultValue: T | (() => T) | undefined = undefined,
  required: boolean | undefined = undefined
) {
  return {
    type: undefined as unknown as PropType<T>,
    default: defaultValue,
    required
  };
}
