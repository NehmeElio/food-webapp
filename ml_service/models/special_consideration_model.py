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
    # Initialize Dagshub and MLflow only once
    dagshub.init(repo_owner='NehmeElio', repo_name='food-webapp', mlflow=True)
    #mlflow.set_tracking_uri("https://dagshub.com/NehmeElio/food-webapp")
    initialized = True
# Set experiment name
experiment_name = "special_consideration_treev1"

mlflow.set_experiment(experiment_name)
def train_special_consideration(input,labels):
    from itertools import chain
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

def evaluate_special_consideration_model(predictions,real_labels,mlb):
    for i, label in enumerate(mlb.classes_):
        print(f"Performance for {label}:")
        print(classification_report(real_labels[:, i], predictions[:, i]))
# Function to binarize a DataFrame column

def binarize_labels(df, column_name):
    mlb = MultiLabelBinarizer()
    return mlb.fit_transform(df[column_name]),mlb

def binarize_user_label(mlb,ingredients):
    return mlb.transform(ingredients)

import pandas as pd

import pandas as pd
from collections import Counter

def filter_undersampled_special_considerations_list(df):
    columns_to_remove = ["Low Fat", "Low Cal", "Paleo", "Low Carb", "Sugar Conscious", "Fat Free", "Kid-Friendly", 
                     "Kosher", "Pescatarian", "Quick & Easy", "Soy Free", "Healthyish", "Raw"]

    columns_set = set(columns_to_remove)

    # Apply function with additional check for NaN
    df["special-consideration"] = df["special-consideration"].apply(
        lambda tags: [tag for tag in tags if isinstance(tags, list) and tag not in columns_set] if isinstance(tags, list) else tags
    )
    
    return df


      
if __name__ == "__main__":

    df = pd.read_json("data/recipes_images.json", orient="records", lines=True)

    df=filter_undersampled_special_considerations_list(df)

    df = df.dropna(subset=["ingredient", "special-consideration"])
    X,mlb_ingredient=binarize_labels(df,"ingredient")
    Y,mlb_special=binarize_labels(df,"special-consideration")
    
    with open("mlb_special.pkl", "wb") as f:
        pickle.dump(mlb_special, f)
    with open("mlb_ingredient.pkl", "wb") as f:
        pickle.dump(mlb_ingredient, f)
    
    X_train,X_test,Y_train,Y_test=train_test_split(X,Y,test_size=0.2)
    with mlflow.start_run():

        mlflow.log_param("smote", "yes")
        mlflow.log_param("model_type", "RandomForest")
        mlflow.log_param("n_estimators", 100)
        mlflow.log_param("max_depth", 10)

        classifiers = train_special_consideration(X_train, Y_train)
        predictions = predict_all(X_test, classifiers)
        

        # Evaluate the model
        metrics_dict = evaluate_smote(predictions,  mlb_special,Y_test,)

        for metric, value in metrics_dict.items():
            mlflow.log_metric(metric, value)

        for i, model in enumerate(classifiers):
            mlflow.sklearn.log_model(model, f"model_{i}")
            
        mlflow.log_artifact("mlb_special.pkl", "mlb_special.pkl")
        mlflow.log_artifact("mlb_ingredient.pkl", "mlb_ingredient.pkl")
    
    