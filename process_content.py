import os
import json
import re
from bs4 import BeautifulSoup

BASE_FOLDER = "www/content/abdomen-pelvis"

def extract_text(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "lxml")
        return soup.get_text(separator="\n")

def parse_sections(text):
    return {
        "tips": re.findall(r"\[TIP\](.*)", text),
        "clinical": re.findall(r"\[CLINICAL\](.*)", text),
        "warnings": re.findall(r"\[WARNING\](.*)", text),
        "main": re.sub(r"\[.*?\]", "", text)
    }

def chunk_text(text, size=400):
    words = text.split()
    chunks = []
    for i in range(0, len(words), size):
        chunks.append(" ".join(words[i:i+size]))
    return chunks

all_topics = []

for file in os.listdir(BASE_FOLDER):
    if file.endswith(".html"):
        path = os.path.join(BASE_FOLDER, file)

        raw_text = extract_text(path)
        parsed = parse_sections(raw_text)

        chunks = chunk_text(parsed["main"])

        topic_data = {
            "topic": file.replace(".html", ""),
            "chunks": chunks,
            "clinical": parsed["clinical"],
            "tips": parsed["tips"]
        }

        all_topics.append(topic_data)

# Save output
with open("processed_content.json", "w", encoding="utf-8") as f:
    json.dump(all_topics, f, indent=2)

print("✅ Processing complete. File saved as processed_content.json")