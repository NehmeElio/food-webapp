from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
import numpy as np
from sklearn.metrics import classification_report
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from ml_service.scripts.evaluate import evaluate_smote
import mlflow.sklearn
import dagshub
import mlflow
import pickle

initialized = False

if not initialized:
    dagshub.init(repo_owner='NehmeElio', repo_name='food-webapp', mlflow=True)

    initialized = True
    
# Set experiment name
experiment_name = "meal_treev1"
mlflow.set_experiment(experiment_name)
def train_meal(input,labels):

    classifiers = []
    for i in range(labels.shape[1]):
        # Extract the binary label for this dietary restriction
        y_single = labels[:, i]
        
        # Apply SMOTE for this single label
        smote = SMOTE()
        X_res, y_res = smote.fit_resample(input, y_single)
        
        # Train model on the resampled data
        model = RandomForestClassifier()
        model.fit(X_res, y_res)
        
        # Store the trained model
        classifiers.append(model)
    return classifiers
        
def predict_all(input,classifiers):
    predictions = np.zeros((input.shape[0], len(classifiers)))
    for i, clf in enumerate(classifiers):
        predictions[:, i] = clf.predict(input)
    return predictions

def evaluate_meal_consideration_model(predictions,real_labels,mlb):
    for i, label in enumerate(mlb.classes_):
        print(f"Performance for {label}:")
        print(classification_report(real_labels[:, i], predictions[:, i]))
# Function to binarize a DataFrame column

def binarize_labels(df, column_name):
    mlb = MultiLabelBinarizer()
    return mlb.fit_transform(df[column_name]),mlb

def binarize_user_label(mlb,ingredients):
    return mlb.transform(ingredients)

      
if __name__ == "__main__":

    from collections import Counter
    from itertools import chain
    df = pd.read_json("data/recipes_images.json", orient="records", lines=True)

    df = df[df["ingredient"].apply(lambda x: bool(x))]  # Drops rows where 'ingredient' is empty or NaN
    df = df[df["meal"].apply(lambda x: bool(x))]  # Drops rows where 'meal_grouped' is empty or NaN

    X,mlb_ingredient=binarize_labels(df,"ingredient")
    Y,mlb_meal=binarize_labels(df,"meal")
    
   
    
    with open("mlb_meal.pkl", "wb") as f:
        pickle.dump(mlb_meal, f)
    with open("mlb_ingredient.pkl", "wb") as f:
        pickle.dump(mlb_ingredient, f)
        
    X_train,X_test,Y_train,Y_test=train_test_split(X,Y,test_size=0.2)
    
    with mlflow.start_run():

        mlflow.log_param("smote", "yes")
        mlflow.log_param("model_type", "RandomForest")
        mlflow.log_param("n_estimators", 100)
        mlflow.log_param("max_depth", 10)

        classifiers = train_meal(X_train, Y_train)
        predictions = predict_all(X_test, classifiers)
        

        # Evaluate the model
        metrics_dict = evaluate_smote(predictions,  mlb_meal,Y_test)

        for metric, value in metrics_dict.items():
            mlflow.log_metric(metric, value)

        for i, model in enumerate(classifiers):
            mlflow.sklearn.log_model(model, f"model_{i}")
            
        mlflow.log_artifact("mlb_meal.pkl", "mlb_meal.pkl")
        mlflow.log_artifact("mlb_ingredient.pkl", "mlb_ingredient.pkl")
            
    
    