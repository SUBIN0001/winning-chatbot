# C:\SUBIN\final\test_backend.py
import requests
import json

BASE_URL = "http://localhost:8000"

def test_root():
    print("Testing root endpoint...")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_upload():
    print("Testing upload endpoint...")
    # You'll need a test PDF file
    test_file_path = "test.pdf"  # Create a small PDF for testing
    
    if not os.path.exists(test_file_path):
        print("No test PDF found. Creating a dummy test...")
        # Try without file first
        return
    
    with open(test_file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(f"{BASE_URL}/upload-pdf", files=files)
    
    print(f"Upload Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Upload Response: {data}")
        return data.get("id")  # Return file ID for FAQ generation test
    else:
        print(f"Upload Error: {response.text}")
    print()

def test_generate_faq(file_id=None):
    print("Testing FAQ generation...")
    if not file_id:
        print("No file ID provided, using dummy ID")
        file_id = "test-id-123"
    
    payload = {"file_id": file_id}
    response = requests.post(
        f"{BASE_URL}/generate-faq", 
        json=payload,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"FAQ Status: {response.status_code}")
    print(f"FAQ Response: {json.dumps(response.json(), indent=2)}")
    print()

if __name__ == "__main__":
    import os
    
    print("=" * 50)
    print("Testing FAQ Generator Backend")
    print("=" * 50)
    
    test_root()
    test_upload()
    # Uncomment and provide a real file_id after upload
    # test_generate_faq("your-file-id-here")