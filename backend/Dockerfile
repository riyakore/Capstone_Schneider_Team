# This is the initial dockerfile setup with the pipenv
# The port I am using for backend is Port 8000
# Use a lightweight Python image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy Pipenv files to the container
COPY Pipfile Pipfile.lock ./

# Install pipenv and Python dependencies
RUN pip install --no-cache-dir pipenv && \
    pipenv install --system --deploy

# Copy the rest of the backend code (including manage.py)
COPY . .

# Expose port 8000 for Django
EXPOSE 8000

# Default command to run the development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
