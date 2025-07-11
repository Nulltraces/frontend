import { createEffect } from "solid-js";

import { useState } from "@uwucord/state";

import {
  createMaterialColourVariables,
  createMduiColourTriplets,
  createuwucordWebVariables,
} from ".";
import { Masks } from "./Masks";
import { legacyThemeUnsetShim } from "./legacyThemeGeneratorCode";

/**
 * Component for loading theme variables into root
 */
export function LoadTheme() {
  const state = useState();

  createEffect(() => {
    const activeTheme = state.theme.activeTheme;

    for (const [key, value] of Object.entries({
      // create unset variables to indicate where colours need replacing
      ...Object.keys(legacyThemeUnsetShim().colours).reduce(
        (d, k) => ({
          ...d,
          [`--colours-${k}`]: k.includes("background")
            ? "var(--unset-bg)"
            : "var(--unset-fg)",
        }),
        {},
      ),
      // mount uwucord for Web variables
      ...createuwucordWebVariables(activeTheme),
      // mount --md-sys-color variables
      ...createMaterialColourVariables(activeTheme, "--md-sys-color-"),
      // mount --mdui-color triplet variables
      ...createMduiColourTriplets(activeTheme, "--mdui-color-"),
    })) {
      document.body.style.setProperty(key, value);
    }
  });

  return <Masks />;
}
