import os
import boto3
from fastapi import APIRouter, HTTPException, HTTPException
from fastapi import status
from pydantic import BaseModel

router = APIRouter()

class EmailContents(BaseModel):
    name: str
    company: str
    phone: str
    email: str
    subject: str
    message: str

@router.post("/send")
async def send_contact_email(data: EmailContents):
    """
    Sends a formatted email to the configured SES destination email
    using data from the contact form.
    """

    sender_email = os.environ.get("SES_SENDER_EMAIL")
    destination_email = os.environ.get("SES_DESTINATION_EMAIL")

    # Both source and destination must exist
    if not sender_email or not destination_email:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Email configuration is missing"
        )
    
    # Format email
    email_subject = f"New website inquiry: {data.subject}"
    email_body = f"""
    You have received a new message from your website contact form:

    Name: {data.name}
    Company: {data.company}
    Phone: {data.phone}
    Email: {data.email}
    Subject: {data.subject}
    Message: {data.message}
    """

    # Send email with SES
    ses_client = boto3.client(
        "ses", 
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
        region_name=os.environ.get("AWS_REGION", "us-west-2")
    )
    try:
        response = ses_client.send_email(
            Source=sender_email,
            Destination={"ToAddresses": [destination_email]},
            Message={
                "Subject": {"Data": email_subject, "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": email_body, "Charset": "UTF-8"}
                },
            },
            ReplyToAddresses=[data.email if data.email else sender_email]
        )
        return {"message": "Email sent successfully", "message_id": response["MessageId"]}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )