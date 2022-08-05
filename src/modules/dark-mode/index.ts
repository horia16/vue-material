const auto = ref(true);

const systemMode = ref<"light" | "dark">("light");
const userMode = ref<"light" | "dark">("light");

function setAuto(value: boolean) {
  auto.value = value;
}

function setSystemMode(mode: "light" | "dark"): void {
  systemMode.value = mode;
}

export function isAuto() {
  return auto;
}

export function getSystemMode() {
  return systemMode;
}

export function toggleAutoMode() {
  setAuto(!auto.value);
}

export const darkMode = computed(() => {
  if (auto.value) return systemMode.value;

  return userMode.value;
});

export default function () {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setSystemMode(dark ? "dark" : "light");

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    const dark = event.matches;

    setSystemMode(dark ? "dark" : "light");
  });
}
