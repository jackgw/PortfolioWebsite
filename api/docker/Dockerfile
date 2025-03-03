FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Copy project files into container
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port the app runs on
# EXPOSE 3031
EXPOSE 80

# Command to run the application
CMD python3 main.py
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3031"]
