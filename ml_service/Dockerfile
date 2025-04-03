# Use an official Python runtime as a base image
FROM python:3.12-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the ml_service directory into the container at /app
COPY ml_service/ /app/

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential libssl-dev libffi-dev python3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* || true

# Install Python dependencies from requirements.txt
COPY ml_service/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt  # Add --no-cache-dir to prevent pip from caching packages

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
