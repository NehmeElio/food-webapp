from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_predict_cuisine():
    response = client.post(
        "/predict/cuisine",
        json={"ingredients": ["Salt", "Olive", "Squash"]}
    )
    assert response.status_code == 200
    assert isinstance(response.json()["cuisines"], list)

def test_predict_meal():
    response = client.post(
        "/predict/meal",
         json={"ingredients": ["Salt", "Olive", "Squash"]}
    )
    assert response.status_code == 200
    assert isinstance(response.json()["meals"], list)

def test_predict_special():
    response = client.post(
        "/predict/special",
         json={"ingredients": ["Salt", "Olive", "Squash"]}
    )
    assert response.status_code == 200
    assert isinstance(response.json()["meals"], list)
