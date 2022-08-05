import { getConfiguration } from "@/modules/configuration";
import prop from "@/utilities/prop";

export default defineComponent({
  name: "VmIcon",
  props: {
    icon: prop<string | null>(null)
  },
  setup(props, { slots }) {
    const { icon } = getConfiguration();

    return () => {
      if (icon) return h(icon.component, { ...icon.defaults, [icon.key]: props.icon }, slots.default?.());
    };
  }
});
