$tempDir = Join-Path $env:TEMP "phase4_backup_$(Get-Random)"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

# List of files/folders to exclude from the backup
$exclude = @(
    'node_modules', 
    '.git', 
    '.next', 
    'deployment.zip', 
    'phase4.zip', 
    'zip_project.ps1', 
    'zip.js', 
    'create_phase4_backup.ps1',
    '.env.local'
)

Write-Host "Copying files to temporary directory..."
Get-ChildItem -Path . | Where-Object { $exclude -notcontains $_.Name } | Copy-Item -Destination $tempDir -Recurse -Force

Write-Host "Compressing files into phase4.zip..."
# Using Compress-Archive to create the zip. 
# We place it in the parent directory as requested.
$destinationPath = Join-Path (Get-Item ..).FullName "phase4.zip"
Compress-Archive -Path "$tempDir\*" -DestinationPath $destinationPath -Force

Write-Host "Cleaning up temporary files..."
Remove-Item $tempDir -Recurse -Force

if (Test-Path $destinationPath) {
    $size = (Get-Item $destinationPath).Length / 1MB
    Write-Host "Backup phase4.zip created successfully!"
    Write-Host "Location: $destinationPath"
    Write-Host "Size: $([Math]::Round($size, 2)) MB"
} else {
    Write-Error "Failed to create backup."
}
