[OutputType([Void])]
Param(
  [Parameter(Mandatory)]
  [String]
  $FilePath,

  [Parameter(Mandatory)]
  [String]
  $KeyPairAlias,

  [Parameter(Mandatory)]
  [String]
  $SmctlDir,

  [Parameter(Mandatory)]
  [String]
  $SignToolDir
)

# Set the path
$env:Path = @(
  [System.Environment]::GetEnvironmentVariable('Path', 'Machine'),
  [System.Environment]::GetEnvironmentVariable('Path', 'User'),
  $SignToolDir
) -join ';'

# Get the smctl.exe executable
$smctl = "$SmctlDir\smctl.exe"

& "$smctl" sign --input="$FilePath" --keypair-alias="$KeyPairAlias" --verbose
