
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Load Dataset

df = pd.read_csv("data/cleaned_customers.csv")

print("Original Dataset Shape:", df.shape)

print("\nMissing Values Before Cleaning:")
print(df.isnull().sum())

# Data Cleaning

df["Age"] = df["Age"].fillna(df["Age"].mean())

df["Annual Income (k$)"] = df["Annual Income (k$)"].fillna(
    df["Annual Income (k$)"].mean()
)

df["Spending Score (1-100)"] = df["Spending Score (1-100)"].fillna(
    df["Spending Score (1-100)"].mean()
)

df["Gender"] = df["Gender"].fillna(df["Gender"].mode()[0])

print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

# Save cleaned dataset
df.to_csv("data/cleaned_customers.csv", index=False)

print("\nDataset Cleaned Successfully!")
print("Cleaned dataset saved as cleaned_customers.csv")

# Exploratory Data Analysis (EDA)

# Age Distribution
plt.figure(figsize=(8,5))
plt.hist(df["Age"], bins=10)
plt.title("Age Distribution")
plt.xlabel("Age")
plt.ylabel("Number of Customers")
plt.show()

# Gender Distribution
gender = df["Gender"].value_counts()

plt.figure(figsize=(6,5))
plt.bar(gender.index, gender.values)
plt.title("Gender Distribution")
plt.xlabel("Gender")
plt.ylabel("Count")
plt.show()

# Annual Income Distribution
plt.figure(figsize=(8,5))
plt.hist(df["Annual Income (k$)"], bins=10)
plt.title("Annual Income Distribution")
plt.xlabel("Annual Income (k$)")
plt.ylabel("Customers")
plt.show()

# Spending Score Distribution
plt.figure(figsize=(8,5))
plt.hist(df["Spending Score (1-100)"], bins=10)
plt.title("Spending Score Distribution")
plt.xlabel("Spending Score")
plt.ylabel("Customers")
plt.show()

# Feature Selection

X = df[["Annual Income (k$)", "Spending Score (1-100)"]]

print("\nSelected Features:")
print(X.head())

# Elbow Method

wcss = []

for i in range(1,11):
    model = KMeans(n_clusters=i, random_state=42)
    model.fit(X)
    wcss.append(model.inertia_)

plt.figure(figsize=(8,5))
plt.plot(range(1,11), wcss, marker='o')
plt.title("Elbow Method")
plt.xlabel("Number of Clusters")
plt.ylabel("WCSS")
plt.grid(True)
plt.show()

# Apply K-Means Clustering

kmeans = KMeans(n_clusters=5, random_state=42)

df["Cluster"] = kmeans.fit_predict(X)

print("\nClusters Assigned Successfully!")
print(df.head())

# Cluster Centers

print("\nCluster Centers:")
print(kmeans.cluster_centers_)

# Customer Segment Names

cluster_names = {
    0: "High Income - Low Spending",
    1: "Low Income - High Spending",
    2: "Regular Customers",
    3: "Premium Income - Very Low Spending",
    4: "Average Customers"
}

df["Customer Segment"] = df["Cluster"].map(cluster_names)

# Visualize Customer Segments

plt.figure(figsize=(10,6))

plt.scatter(
    df["Annual Income (k$)"],
    df["Spending Score (1-100)"],
    c=df["Cluster"],
    cmap="viridis",
    s=50
)

# Plot Cluster Centers
plt.scatter(
    kmeans.cluster_centers_[:,0],
    kmeans.cluster_centers_[:,1],
    c="red",
    marker="X",
    s=250,
    label="Centroids"
)

plt.title("Customer Segmentation using K-Means")
plt.xlabel("Annual Income (k$)")
plt.ylabel("Spending Score (1-100)")
plt.legend()

plt.show()

# Save Final Dataset

df.to_csv("data/customer_segments.csv", index=False)

print("\nCustomer Segments Added Successfully!")
print("Final dataset saved as customer_segments.csv")

print("\nFirst 5 Records:")
print(df.head())