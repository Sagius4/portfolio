import os
import sys

path = r"style.css"
if not os.path.exists(path):
    print("style.css not found")
    sys.exit(1)

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace primary (Blue to Emerald)
text = text.replace("#3b82f6", "#10b981") # Hex
text = text.replace("rgba(59, 130, 246", "rgba(16, 185, 129") # RGB with spaces
text = text.replace("rgba(59,130,246", "rgba(16,185,129") # RGB without spaces

# Replace secondary (Purple to Cyan)
text = text.replace("#8b5cf6", "#06b6d4") # Hex
text = text.replace("rgba(139, 92, 246", "rgba(6, 182, 212") # RGB with spaces
text = text.replace("rgba(139,92,246", "rgba(6,182,212") # RGB without spaces

with open(path, "w", encoding="utf-8") as f:
    f.write(text)

print("Colors updated successfully")
