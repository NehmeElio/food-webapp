# Use an official Python runtime as a base image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ml_service/ /app/

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential libssl-dev libffi-dev python3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* || true


# Install Python dependencies from requirements.txt
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application (adjust as needed)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
