from flask import Flask, render_template, request, redirect, send_file
import pandas as pd
import io

from database import (
    initialize_database,
    get_all_customers,
    add_customer,
    update_customer,
    delete_customer
)

app = Flask(__name__)


# ==============================
# Initialize Database
# ==============================

initialize_database()


# Dashboard CSV
df = pd.read_csv("data/customer_segments.csv")


# ==============================
# Dashboard
# ==============================

@app.route("/")
def dashboard():

    total_customers = len(df)

    average_age = round(df["Age"].mean(), 1)
    average_income = round(df["Annual Income (k$)"].mean(), 1)
    average_spending = round(df["Spending Score (1-100)"].mean(), 1)


    # ==============================
    # Pagination
    # ==============================

    page = request.args.get("page", 1, type=int)

    records_per_page = 100

    start = (page - 1) * records_per_page
    end = start + records_per_page

    customers = df.iloc[start:end].to_dict(orient="records")

    total_pages = (len(df) + records_per_page - 1) // records_per_page



    # ==============================
    # Gender Chart
    # ==============================

    gender_counts = df["Gender"].value_counts()

    gender_labels = gender_counts.index.tolist()
    gender_values = gender_counts.values.tolist()



    # ==============================
    # Cluster Chart
    # ==============================

    cluster_counts = df["Customer Segment"].value_counts()

    cluster_labels = [
        f"Cluster {i}" 
        for i in cluster_counts.index
    ]

    cluster_values = cluster_counts.values.tolist()



    # ==============================
    # Income vs Spending
    # ==============================

    income = df["Annual Income (k$)"].tolist()

    spending = df["Spending Score (1-100)"].tolist()



    # ==============================
    # Age Groups
    # ==============================

    age_groups = [
        "18-25",
        "26-35",
        "36-45",
        "46+"
    ]

    age_values = [

        len(df[
            (df["Age"] >= 18) &
            (df["Age"] <= 25)
        ]),

        len(df[
            (df["Age"] >= 26) &
            (df["Age"] <= 35)
        ]),

        len(df[
            (df["Age"] >= 36) &
            (df["Age"] <= 45)
        ]),

        len(df[
            df["Age"] >= 46
        ])

    ]


    return render_template(
        "dashboard.html",

        total_customers=total_customers,

        average_age=average_age,

        average_income=average_income,

        average_spending=average_spending,


        # Table Data
        customers=customers,

        # Pagination
        page=page,
        total_pages=total_pages,


        # Charts
        gender_labels=gender_labels,
        gender_values=gender_values,

        cluster_labels=cluster_labels,
        cluster_values=cluster_values,

        income=income,
        spending=spending,

        age_groups=age_groups,
        age_values=age_values
    )



# ==============================
# Customers (NEW UI)
# ==============================

@app.route("/customers")
def customers():

    page = request.args.get("page", 1, type=int)

    records_per_page = 100

    all_customers = get_all_customers()

    total_customers = len(all_customers)

    start = (page - 1) * records_per_page
    end = start + records_per_page

    customers = all_customers[start:end]

    total_pages = (total_customers + records_per_page - 1) // records_per_page

    success = request.args.get("success")

    return render_template(
        "customers_new.html",
        customers=customers,
        success=success,
        page=page,
        total_pages=total_pages
    )


# ==============================
# Add Customer
# ==============================

@app.route("/add_customer", methods=["POST"])
def add_customer_route():

    customer = (

        int(request.form["customer_id"]),
        request.form["gender"],
        int(request.form["age"]),
        int(request.form["income"]),
        int(request.form["score"]),
        0

    )

    add_customer(customer)

    return redirect("/customers?success=added")



# ==============================
# Update Customer
# ==============================

@app.route("/update_customer", methods=["POST"])
def update_customer_route():

    customer = (

        int(request.form["customer_id"]),
        request.form["gender"],
        int(request.form["age"]),
        int(request.form["income"]),
        int(request.form["score"]),
        0

    )

    update_customer(customer)

    return redirect("/customers?success=updated")



# ==============================
# Delete Customer
# ==============================

@app.route("/delete_customer/<int:id>")
def delete_customer_route(id):

    delete_customer(id)

    return redirect("/customers?success=deleted")

# ==============================
# Segments page
# ==============================

@app.route("/segments")
def segments():
    return render_template("segments.html")

# ==============================
# Analytics page
# ==============================

@app.route("/analytics")
def analytics():

    return render_template("analytics.html")

# ==============================
# Database page
# ==============================

@app.route("/database")
def database():
    return render_template("database.html")

# ==============================
# Settings page
# ==============================

@app.route("/settings")
def settings():

    return render_template("settings.html")

# ==============================
# Download Report
# ==============================

@app.route("/download")
def download():

    output = io.BytesIO()


    with pd.ExcelWriter(
        output,
        engine="openpyxl"
    ) as writer:

        df.to_excel(
            writer,
            index=False
        )


    output.seek(0)


    return send_file(

        output,

        download_name="CustomerIQ_Report.xlsx",

        as_attachment=True

    )

# ==============================

if __name__ == "__main__":

    app.run(debug=True)