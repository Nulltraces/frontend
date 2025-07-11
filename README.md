# uwucord Desktop

## ⚠️ Deprecation notice ⚠️

This project will soon be deprecated in favour of a new desktop app built with Tauri. You can follow progress [here](https://github.com/uwucord/frontend/issues/14).

## Description

This is a desktop application for uwucord built on Electron.

## Stack

-   [Electron](https://electronjs.org/)
-   [Electron Builder](https://www.electron.build/)

## Resources

### uwucord Desktop

-   [uwucord Desktop Issue Board](https://github.com/uwucord/desktop/issues)

### uwucord

-   [uwucord Project Board](https://github.com/uwucord/uwucord/discussions) (Submit feature requests here)
-   [uwucord Testers Server](https://app.uwucord.chat/invite/Testers)
-   [Contribution Guide](https://developers.uwucord.chat/contributing)

## Quick Start

Get uwucord Desktop up and running locally.

```
git clone https://github.com/uwucord/desktop
cd desktop
yarn
yarn build:bundle
yarn start
```

## CLI Commands

| Command             | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| `yarn build:bundle` | Builds the application bundle from TypeScript files.                                |
| `yarn watch:bundle` | Watches TypeScript files for changes and rebuilds the application bundle on change. |
| `yarn start`        | Starts the application.                                                             |
| `yarn eb`           | Runs electron-builder.                                                              |
| `yarn release`      | Prepares a release. Requires a valid .env file.                                     |
| `yarn clean`        | Cleans the application bundle.                                                      |

There are also numerous OS-specific commands related to building and testing, all prefixed with `yarn`:

-   `build:linux` `build:mac`, `build:windows`
    -   Builds the application for the specified platform.

## License

uwucord Desktop is licensed under the [GNU Affero General Public License v3.0](https://github.com/uwucord/desktop/blob/master/LICENSE).
