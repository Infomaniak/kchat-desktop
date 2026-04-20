title Gestion des appels entrants - Desktop App
participant "Server\n(WebSocket)" as Server
participant "Webapp\n(k chat)" as Webapp
participant "Desktop API\n(IPC Renderer)" as DesktopAPI
participant "Main Process\n(Electron)" as Main
participant "CallDialingWindow" as RingWindow
participant "KmeetCallWindow\n(Jitsi)" as CallWindow
== Réception de l'appel entrant ==
Server->Webapp: WebSocket: new_call_notification\n(call_id, channel_id, caller, participants)
activate Webapp
Webapp->Webapp: receivedCall(action)\nNote over Webapp: Récupère channel, users,\ncaller info depuis Redux
alt Desktop App (Electron)
    Webapp->DesktopAPI: window.desktopAPI.openCallDialing({\n  conference, currentUser, caller,\n  users, channelId\n})
    DesktopAPI->Main: IPC: CALL_RINGING\n(callInfo)
    
    Main->RingWindow: create(callInfo)
    activate RingWindow
    RingWindow->RingWindow: Création fenêtre\n(280x230, alwaysOnTop)\nNote right: callDialingWindow.ts\n    RingWindow->RingWindow: Affiche infos appel\n(caller avatar, channel name,\nparticipants, boutons Accept/Decline)\n    Main-->DesktopAPI: OK
    DesktopAPI-->Webapp: OK
else Web Browser
    Webapp->Webapp: openModal(INCOMING_CALL)\nNote right: KmeetModal component\nend
deactivate Webapp
== Fenêtre de ringing affichée ==
RingWindow-->Main: did-finish-load\ninfo-received → renderer
== L'utilisateur répond à l'appel ==
User->RingWindow: Click "Accepter"
RingWindow->DesktopAPI: IPC: dialApi.callAccept(callInfo)
DesktopAPI->Main: IPC: CALL_JOINED\n(callInfo)
Main->RingWindow: destroy()\ndeactivate RingWindow
Main->Webapp: IPC: CALL_JOINED\n(via ViewManager.sendToAllViews)
deactivate RingWindow
activate Webapp
Webapp->Webapp: Reçoit CALL_JOINED\nvia callManager.onCallJoined
Webapp->DesktopAPI: window.desktopAPI.openKmeetCallWindow({\n  avatar, user, channelID,\n  conferenceId, name, locale, jwt\n})
DesktopAPI->Main: IPC: CALL_OPEN_WINDOW\n(callInfo)
Main->Main: handleOpenKmeetWindow()
Main->RingWindow: closeRingWindow()\nNote right: Ferme ringing si ouvert
Main->CallWindow: create(callInfo)
activate CallWindow
CallWindow->CallWindow: Création fenêtre\n(1100x800, center)
Note right: kmeetCallWindow.ts\nCallWindow->CallWindow: buildWindow()\npreload: call.ts, session main
CallWindow->CallWindow: loadURL('kchat-desktop://renderer/call.html')
CallWindow-->Main: dom-ready\nsend 'load-server-url'\n→ charge kmeet.js
CallWindow->CallWindow: JitsiMeetExternalAPI\ninitialisé avec JWT\nNote right: call.ts preload\n    UserInfo: displayName\n    Room: channelID\n    JWT: auth token
Main-->DesktopAPI: OK
DesktopAPI-->Webapp: OK
deactivate Webapp
== Call Window active ==
activate CallWindow
CallWindow-->User: Affiche interface Jitsi/Kmeet\n(video, audio, contrôles)
User->CallWindow: Interaction call\n(video, audio, screen share)
CallWindow->CallWindow: setupScreenSharingRender()\nsetupAlwaysOnTopRender()\nsetupPowerMonitorRender()
alt Fin de l'appel
    User->CallWindow: Hang up / Quitter
    CallWindow->DesktopAPI: IPC: CALL_ENDED\nou readyToClose event
    DesktopAPI->Main: IPC: CALL_ENDED
    Main->CallWindow: destroy()
    deactivate CallWindow
    Main->Webapp: IPC: CALL_ENDED\n(via ViewManager)
end