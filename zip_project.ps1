$tempDir = Join-Path $env:TEMP "deploy_build_$(Get-Random)"
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
$exclude = @('node_modules', '.git', '.next', 'deployment.zip', 'zip_project.ps1')

Write-Host "Copying files to temporary directory..."
Get-ChildItem -Path . | Where-Object { $exclude -notcontains $_.Name } | Copy-Item -Destination $tempDir -Recurse -Force

Write-Host "Compressing files..."
Compress-Archive -Path "$tempDir\*" -DestinationPath "deployment.zip" -Force

Write-Host "Cleaning up temporary files..."
Remove-Item $tempDir -Recurse -Force

Write-Host "Deployment zip created successfully!"
