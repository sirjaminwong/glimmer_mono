import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./{app,modules}/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
};

export default config;
