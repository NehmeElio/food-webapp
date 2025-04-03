import numpy as np
from sklearn.metrics import classification_report, accuracy_score
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Function to evaluate the model
def evaluate_model(model, X_test, Y_test, target_names):
    """
    Evaluates the model and prints out classification metrics (precision, recall, f1-score)
    along with the confusion matrix.
    
    Args:
    model: The trained model to be evaluated
    X_test: The feature set for testing
    Y_test: The ground truth labels
    target_names: List of target class names (for displaying metrics)
    """
    # Predict the classes
    Y_pred = model.predict(X_test)

    # Print classification report
    print("Classification Report:")
    print(classification_report(Y_test, Y_pred, target_names=target_names))

    # Print accuracy score
    accuracy = accuracy_score(Y_test, Y_pred)
    print(f"Accuracy: {accuracy:.4f}")

    # Confusion matrix
    cm = confusion_matrix(Y_test.argmax(axis=1), Y_pred.argmax(axis=1), labels=np.arange(len(target_names)))

    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=target_names)
    disp.plot(cmap=plt.cm.Blues)
    plt.title("Confusion Matrix")
    plt.show()

# Example usage:
# Assuming model is trained and X_test, Y_test are prepared

# Define the target names (the names of your classes)
target_names = ['Dairy Free', 'Gluten Free', 'Vegan', 'Vegetarian', 'Keto', 'Nut Free']

# Example trained model (replace this with your trained model)
# model = your_trained_model

# Assuming X_test and Y_test are available after splitting the dataset
# evaluate_model(model, X_test, Y_test, target_names)

def evaluate_smote(predictions, mlb, y_test):
   
    # Initialize an empty dictionary to hold the metrics to log to MLflow
    metrics_dict = {}
    
    # Get the classification report for each class
    class_report = classification_report(y_test, predictions, target_names=mlb.classes_, output_dict=True)
    print(class_report)
    # For each class, extract precision, recall, and f1-score
    for label, metrics in class_report.items():
        if label not in ['accuracy', 'macro avg', 'weighted avg']:
            metrics_dict[f'precision_{label}'] = metrics['precision']
            metrics_dict[f'recall_{label}'] = metrics['recall']
            metrics_dict[f'f1_score_{label}'] = metrics['f1-score']
    
    # Log macro and micro averages
    macro_avg = class_report['macro avg']
    micro_avg = class_report['micro avg']
    
    metrics_dict['precision_macro_avg'] = macro_avg['precision']
    metrics_dict['recall_macro_avg'] = macro_avg['recall']
    metrics_dict['f1_score_macro_avg'] = macro_avg['f1-score']
    
    metrics_dict['precision_micro_avg'] = micro_avg['precision']
    metrics_dict['recall_micro_avg'] = micro_avg['recall']
    metrics_dict['f1_score_micro_avg'] = micro_avg['f1-score']
    
    # Log sample average
    sample_avg = class_report['samples avg']
    metrics_dict['precision_samples_avg'] = sample_avg['precision']
    metrics_dict['recall_samples_avg'] = sample_avg['recall']
    metrics_dict['f1_score_samples_avg'] = sample_avg['f1-score']
    
    # # Log metrics to MLflow
    # for metric, value in metrics_dict.items():
    #     mlflow.log_metric(metric, value)
    
    return metrics_dict