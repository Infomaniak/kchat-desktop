# This macro fetches the currently install MM version via MSI (if any) and uninstalls it first
!macro customInit
  nsExec::ExecToStack "$\"$%SYSTEMROOT%\system32\WindowsPowerShell\v1.0\powershell.exe$\" -command $\"$$Installer = New-Object -ComObject WindowsInstaller.Installer; $$MMProduct = $$Installer.ProductsEx('', '', 7) | Where-Object -FilterScript {$$_.InstallProperty('ProductName') -eq 'Mattermost'}; if ($$MMProduct -ne $$null) {Write-Host -NoNewline $$MMProduct.ProductCode()}$\""
  Pop $0
  Pop $1
  StrCmp $1 "" 0 +1
  ExecWait '"$%SYSTEMROOT%\system32\msiexec.exe" /x $1 /qn'
!macroend

# This macro cleans up the auto-launch registry entry on uninstall
!macro customUnInstall
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "kChat"
!macroend