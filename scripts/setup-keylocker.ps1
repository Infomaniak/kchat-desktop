try {
  $whoami = $MyInvocation.MyCommand

  # Verify that all required environment variables are set
  $required = @(
    'SM_API_KEY',
    'SM_CLIENT_CERT_FILE_B64',
    'SM_CLIENT_CERT_PASSWORD',
    'SM_HOST',
    'SM_CODE_SIGNING_CERT_SHA1_HASH'
  )
  foreach ($variable in $required) {
    if (!$(Test-Path "env:$variable")) {
      throw "Unable to sign files because $variable is not set in the environment."
    }
  }

  # Download SM Tools
  Write-Host "[$whoami] Downloading SM Tools..."
  $params = @{
    Method  = 'Get'
    Headers = @{
      'x-api-key' = $env:SM_API_KEY
    }
    Uri     = 'https://clientauth.one.ch.digicert.com/signingmanager/api-ui/v1/releases/smtools-windows-x64.msi/download'
    OutFile = 'smtools.msi'
  }
  Invoke-WebRequest @params

  # Install SM Tools
  Write-Host "[$whoami] Installing SM Tools..."
  msiexec.exe /i smtools.msi /quiet /qn | Wait-Process
  New-Item C:\Certificate.p12.b64
  Set-Content -Path C:\Certificate.p12.b64 -Value $env:SM_CLIENT_CERT_FILE_B64
  certutil -decode Certificate.p12.b64 Certificate.p12

  Write-Host "[$whoami] Verifying SM Tools install..."
  & "C:\Program Files\DigiCert\DigiCert One Signing Manager Tools\smctl.exe" healthcheck --all
} catch {
  throw $PSItem
}
