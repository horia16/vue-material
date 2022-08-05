import { DefineComponent } from "vue";
import { VMConfiguration } from "./types";

const config: VMConfiguration = {};

export function getConfiguration() {
  return config;
}

export function setIconData(icon: DefineComponent<any, any, any, any>, key: string, defaults?: Record<string, any>) {
  if (!config.icon)
    config.icon = {
      component: icon,
      key,
      defaults
    };
}
