#!/bin/bash

# Bare-bones Web Template Generator for Mac
# Usage: ./create_templates.sh [folder_path]
# If no folder path is provided, uses current directory

# Set target directory (use provided argument or current directory)
TARGET_DIR="${1:-.}"

# Check if directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' does not exist!"
    exit 1
fi

echo "Creating bare-bones web template files in: $TARGET_DIR"

# Create index.html
cat > "$TARGET_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/1.1.0/modern-normalize.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <script src="script.js"></script>
</body>
</html>
EOF

# Create empty style.css
touch "$TARGET_DIR/style.css"

# Create empty script.js
touch "$TARGET_DIR/script.js"

echo "✅ Template files created successfully!"
echo ""
echo "📁 Files created:"
echo "   ├── index.html (with modern-normalize.css linked)"
echo "   ├── style.css (empty)"
echo "   └── script.js (empty)"