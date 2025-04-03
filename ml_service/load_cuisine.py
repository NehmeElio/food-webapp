import mlflow.sklearn
import pickle
import numpy as np

def binarize_ingredients(mlb_ingredient, ingredients):

    print(ingredients)
    valid_ingredients = [ingredient for ingredient in ingredients if ingredient in mlb_ingredient.classes_]
    print(len(mlb_ingredient.classes_))
    print(valid_ingredients)
    return mlb_ingredient.transform([valid_ingredients])

    
def load_cuisine_models():
    mlflow.set_tracking_uri("https://dagshub.com/NehmeElio/food-webapp.mlflow")
    models=[]
    for i in range(9):
        logged_model = f"runs:/17494b08941f4835bdc7d98cce9ee3e7/model_{i}"  # for the first model
        model = mlflow.sklearn.load_model(logged_model)
        models.append(model)
        print(f"model {i} loaded")
        
    return models
        
def load_cuisine_mlb():
       # Load the MLB artifact
    mlflow.set_tracking_uri("https://dagshub.com/NehmeElio/food-webapp.mlflow")
    artifact_path_mlb = "mlb_cuisine.pkl"  # Adjust the artifact path
    artifact_uri=f"runs:/17494b08941f4835bdc7d98cce9ee3e7/{artifact_path_mlb}"
    print(f"Artifact URI: {artifact_uri}")

    artifact_local_path_mlb = mlflow.artifacts.download_artifacts(artifact_uri=artifact_uri,dst_path="ml_service/tmp/cuisine")
    print(artifact_local_path_mlb)
    custom_path=f"{artifact_local_path_mlb}/{artifact_path_mlb}"
    with open(custom_path, 'rb') as f:
        mlb_cuisine = pickle.load(f)
        print("MLB loaded")
    return mlb_cuisine
        
def load_cuisine_ingredient_mlb():
       # Load the MLB artifact
    mlflow.set_tracking_uri("https://dagshub.com/NehmeElio/food-webapp.mlflow")
    artifact_path_mlb = "mlb_ingredient.pkl"  # Adjust the artifact path
    artifact_uri=f"runs:/17494b08941f4835bdc7d98cce9ee3e7/{artifact_path_mlb}"
    print(f"Artifact URI: {artifact_uri}")

    artifact_local_path_mlb = mlflow.artifacts.download_artifacts(artifact_uri=artifact_uri,dst_path="ml_service/tmp/cuisine")
    print(artifact_local_path_mlb)

    custom_path=f"{artifact_local_path_mlb}/{artifact_path_mlb}"
    with open(custom_path, 'rb') as f:
        mlb_ingredient = pickle.load(f)
        print("MLB loaded")
    return mlb_ingredient
        
def predict_cuisine(input, classifiers, mlb_cuisine):
    
    predictions = np.zeros((input.shape[0], len(classifiers)))
    
    for i, clf in enumerate(classifiers):
        predictions[:, i] = clf.predict(input)
    
    # Now convert the predictions into class names using the MLB
    # For each sample (food item), use inverse_transform to get the class names
    predicted_classes = []
    for i in range(predictions.shape[0]):
        binary_prediction = predictions[i, :]
        predicted_class_names = mlb_cuisine.inverse_transform(np.array([binary_prediction]))[0]
        predicted_classes.append(predicted_class_names)
    
    return predicted_classes
