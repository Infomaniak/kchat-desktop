try {
  $whoami = $MyInvocation.MyCommand

  # Verify that all required environment variables are set
  $required = @(
    'SM_API_KEY',
    'SM_TOOLS_URI',
    'SM_KEYPAIR_ALIAS',
    'SM_CLIENT_CERT_FILE_B64',
    'SM_CLIENT_CERT_FILE',
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
    Uri     = $env:SM_TOOLS_URI
    OutFile = 'smtools.msi'
  }
  Invoke-WebRequest @params

  # Install SM Tools
  Write-Host "[$whoami] Installing SM Tools..."
  msiexec.exe /i smtools.msi /quiet /qn | Wait-Process

  Write-Host "[$whoami] Creating certificate file holder..."
  New-Item C:\Certificate.p12.b64

  Write-Host "[$whoami] Setting certificate file content..."
  Set-Content -Path "${env:SM_CLIENT_CERT_FILE}.b64" -Value $env:SM_CLIENT_CERT_FILE_B64

  Write-Host "[$whoami] Decoding certificate file content..."
  certutil -decode "${env:SM_CLIENT_CERT_FILE}.b64" $env:SM_CLIENT_CERT_FILE

  Write-Host "[$whoami] Verifying SM Tools install..."
  & "C:\Program Files\DigiCert\DigiCert One Signing Manager Tools\smctl.exe" healthcheck --all

  # Sync certificate
  Write-Host "[$whoami] Synchronizing certificate..."
  & "C:\Program Files\DigiCert\DigiCert One Signing Manager Tools\smctl.exe" windows certsync --keypair-alias="${env:SM_KEYPAIR_ALIAS}"
} catch {
  throw $PSItem
}
