# Step 1: Import necessary libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Step 2: Load and preprocess your dataset
# Load the CSV file into a DataFrame
df = pd.read_csv("PCOD-10.csv")

# Handle missing values
df = df.dropna()  # Drop rows with missing values

# Convert height from cm to meters
df['Height_m'] = df['Height(Cm) '] / 100

# Calculate BMI using the formula
df['BMI'] = df['Weight (Kg)'] / (df['Height_m'] ** 2)

# Step 3: Separate features (X) and target labels (y)
X = df.drop('PCOS (Y/N)', axis=1)  # Replace 'PCOS (Y/N)' with your target column name
y = df['PCOS (Y/N)']  # Target column

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Scale the features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Step 6: Initialize the SVC model and train it
svc = SVC(kernel='linear', probability=True, random_state=42)  # Set probability=True to enable predict_proba
svc.fit(X_train, y_train)

# Step 7: Evaluate the model's performance
# Make predictions
y_pred_test = svc.predict(X_test)

# Calculate testing accuracy
testing_accuracy = accuracy_score(y_test, y_pred_test)
print(f'\nTesting Accuracy: {testing_accuracy * 100:.2f}%')

# Classification report (on test set)
print("\nClassification Report (Test Set):")
print(classification_report(y_test, y_pred_test))

# Confusion Matrix (on test set)
print("\nConfusion Matrix (Test Set):")
print(confusion_matrix(y_test, y_pred_test))

# Step 8: Taking user input for prediction
def get_user_input():
    input_data = []
    print("\nEnter the values for the features:")
    for feature in X.columns:  # Collecting all features
        if "(Y/N)" in feature:  # Handle categorical Y/N features
            while True:
                value = input(f"{feature} (Y/N): ").strip().upper()  # Expecting Y or N
                if value == 'Y':
                    input_data.append(1)  # Encode 'Y' as 1
                    break
                elif value == 'N':
                    input_data.append(0)  # Encode 'N' as 0
                    break
                else:
                    print("Invalid input! Please enter 'Y' or 'N'.")
        elif "Cycle Length" in feature:  # Handle numerical Cycle Length feature (Days)
            while True:
                try:
                    value = float(input(f"{feature} (in days): "))  # Expecting numerical input (days)
                    input_data.append(value)
                    break  # Exit the loop if input is valid
                except ValueError:
                    print("Invalid input! Please enter a numerical value for Cycle Length (in days).")
        elif "Cycle" in feature and "Length" not in feature:  # Handle Cycle feature (R/I)
            while True:
                value = input(f"{feature} (R/I): ").strip().upper()  # Expecting R or I
                if value == 'R':
                    input_data.append(2)  # Encode 'R' as 2
                    break
                elif value == 'I':
                    input_data.append(5)  # Encode 'I' as 5
                    break
                else:
                    print("Invalid input! Please enter 'R' or 'I'.")
        else:
            # Prompt for numeric features and handle exceptions
            while True:
                try:
                    value = float(input(f"{feature}: "))  # Assuming numerical input
                    input_data.append(value)
                    break  # Exit the loop if input is valid
                except ValueError:
                    print("Invalid input! Please enter a numerical value.")

    return np.array(input_data).reshape(1, -1)

# Get user input
user_input = get_user_input()

if user_input is not None:  # Proceed only if input is valid
    # Scale the user input
    user_input_scaled = scaler.transform(user_input)

    # Make prediction
    user_prediction = svc.predict(user_input_scaled)

    # Get prediction probability
    user_prediction_proba = svc.predict_proba(user_input_scaled)

    # Get the probability of having PCOS (assuming PCOS is labeled as 1)
    pc_pos_probability = user_prediction_proba[0][1]  # Probability of class 1
    pc_neg_probability = user_prediction_proba[0][0]  # Probability of class 0

    # Display the prediction and probabilities
    print(f'\nPrediction for the entered data: {"PCOS" if user_prediction[0] == 1 else "No PCOS"}')
    print(f'Chance of having PCOS: {pc_pos_probability * 100:.2f}%')
    print(f'Chance of not having PCOS: {pc_neg_probability * 100:.2f}%')
