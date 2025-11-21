# kchat-desktop

Infomaniak fork of the mattermost desktop app modified to work with our internal API as part of the kSuite.

:warning: This project is still in beta.

## Running the project

### Prerequisites

-   Node 16

### Desktop integration
* Server dropdown for access to multiple servers
* Dedicated tabs for Channels, Boards and Playbooks
* Desktop Notifications
* Badges for unread channels and mentions
* Deep Linking to open links directly in the app
* Runs in background to reduce number of open windows

```shell
npm install
```

### Running in dev mode

```shell
npm run watch
```

### Running in virtual machine with Linux

1 - DL VirtualBox (version 7.0 for me)

2 - Click on New, define a name and select the ISO (ubuntu-22.04.2-desktop-amd64.iso or other)

3 - Save root identifier.

4 - Let default parameters.

Installation finished, setup env.

1 - If the terminal doesn’t run, use tty (ctrl+ alt + F5).

2 - Grant sudo permission if needed:

-   start root session : su root

-   add `vboxuser`(or your username) to sudo group: `adduser vboxuser sudo`

3 - DL VSCode (https://code.visualstudio.com/docs/?dv=linux64_deb)

4 - Install with Software install (open with … software install)

5 - Now, you can use the terminal from VSCode if needed.

6 - Setup SSH key, pull repo, and run app.

## Certificates

For MacOS certificates, see the internal gitlab wiki
