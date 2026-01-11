from pypdf import PdfReader
import json

# Read the PDF
pdf_path = r"C:\Users\vipra\Documents\GitHub\finalsite\public\SrimadBhagawadGeeta_English_compressed.pdf"
reader = PdfReader(pdf_path)

# Extract text from all pages
all_text = ""
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    all_text += f"\n\n=== PAGE {i+1} ===\n\n"
    all_text += text

# Save to a text file
with open("gita_extracted.txt", "w", encoding="utf-8") as f:
    f.write(all_text)

print(f"Extracted {len(reader.pages)} pages")
print("Text saved to gita_extracted.txt")
print("\nFirst 2000 characters:")
print(all_text[:2000])

