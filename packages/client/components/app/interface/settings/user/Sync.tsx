import { Trans } from "@lingui-solid/solid/macro";

import {
  CategoryButton,
  CategoryButtonGroup,
  Checkbox,
  Column,
  Time,
  iconSize,
} from "@uwucord/ui";

import MdBrush from "@material-design-icons/svg/outlined/brush.svg?component-solid";
import MdLanguage from "@material-design-icons/svg/outlined/language.svg?component-solid";
import MdPalette from "@material-design-icons/svg/outlined/palette.svg?component-solid";

/**
 * Sync Configuration Page
 */
export default function Sync() {
  return (
    <Column gap="lg">
      <CategoryButtonGroup>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon={<MdPalette {...iconSize(22)} />}
          description={
            <Trans>
              Sync appearance options, such as chosen emoji pack and message
              density.
            </Trans>
          }
        >
          <Trans>Appearance</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon={<MdBrush {...iconSize(22)} />}
          description={
            <Trans>Sync your chosen theme, colours, and any custom CSS.</Trans>
          }
        >
          <Trans>Theme</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon={<MdLanguage {...iconSize(22)} />}
          description={<Trans>Sync your currently chosen language.</Trans>}
        >
          <Trans>Language</Trans>
        </CategoryButton>
      </CategoryButtonGroup>
      <CategoryButtonGroup>
        <CategoryButton>
          <Trans>
            Last sync <Time format="relative" value={0} />
          </Trans>
        </CategoryButton>
      </CategoryButtonGroup>
    </Column>
  );
}
