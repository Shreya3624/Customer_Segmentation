import sqlite3
import pandas as pd

DB_NAME = "customer_segmentation.db"


# ==============================
# Create Database
# ==============================

def initialize_database():

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers(

        CustomerID INTEGER PRIMARY KEY,
        Gender TEXT,
        Age INTEGER,
        AnnualIncome INTEGER,
        SpendingScore INTEGER,
        Cluster INTEGER

    )
    """)

    cursor.execute("SELECT COUNT(*) FROM customers")
    count = cursor.fetchone()[0]

    if count == 0:

        df = pd.read_csv("data/customer_segments.csv")

        for _, row in df.iterrows():

            cursor.execute("""

            INSERT INTO customers
            VALUES (?,?,?,?,?,?)

            """, (

                int(row["CustomerID"]),
                row["Gender"],
                int(row["Age"]),
                int(row["Annual Income (k$)"]),
                int(row["Spending Score (1-100)"]),
                int(row["Cluster"])

            ))

    conn.commit()
    conn.close()


# ==============================
# Get All Customers
# ==============================

def get_all_customers():

    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM customers ORDER BY CustomerID")

    customers = cursor.fetchall()

    conn.close()

    return customers


# ==============================
# Add Customer
# ==============================

def add_customer(customer):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""

    INSERT INTO customers
    VALUES (?,?,?,?,?,?)

    """, customer)

    conn.commit()
    conn.close()


# ==============================
# Update Customer
# ==============================

def update_customer(customer):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""

    UPDATE customers

    SET

    Gender=?,
    Age=?,
    AnnualIncome=?,
    SpendingScore=?,
    Cluster=?

    WHERE CustomerID=?

    """, (

        customer[1],
        customer[2],
        customer[3],
        customer[4],
        customer[5],
        customer[0]

    ))

    conn.commit()
    conn.close()


# ==============================
# Delete Customer
# ==============================

def delete_customer(customer_id):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute(

        "DELETE FROM customers WHERE CustomerID=?",
        (customer_id,)

    )

    conn.commit()
    conn.close()