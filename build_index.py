import json
import faiss
import numpy as np
from openai import OpenAI

client = OpenAI()

# Load your processed content
with open("processed_content.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = []
metadata = []

# Flatten all chunks
for topic in data:
    for chunk in topic["chunks"]:
        texts.append(chunk)
        metadata.append(topic["topic"])

# Generate embeddings
def embed(text):
    return client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

print("🔄 Creating embeddings...")

vectors = []
for text in texts[:200]:   # limit to 200 chunks for testing
    vectors.append(embed(text))

vectors = np.array(vectors).astype("float32")

# Build FAISS index
index = faiss.IndexFlatL2(len(vectors[0]))
index.add(vectors)

# Save index
faiss.write_index(index, "anatomy_index.faiss")

# Save mapping
with open("metadata.json", "w") as f:
    json.dump(metadata, f)

print("✅ Index built and saved!")