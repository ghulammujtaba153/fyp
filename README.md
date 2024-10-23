# Cardio Hema Hub

Cardio Hema Hub is a comprehensive healthcare management platform designed to streamline the interaction between patients, doctors, administrators, and laboratory operators. The platform enables efficient appointment scheduling, medical report management, feedback collection, and real-time communication through integrated video call services. Additionally, the platform uses AI to classify ECG results and manage medical records.

## Features

### User Roles
The platform supports four types of users, each with distinct functionalities:

1. **Patient**
   - Register and log in to their account
   - Book appointments with doctors or for medical tests
   - Access chat, video calls and feedback features
   - Track medical records, including prescriptions and test results
   - Book appointments for tests and receive test results directly
   - Receive real-time notifications (e.g., appointment, test results, etc.) via `Socket.IO`
   - Manage personal health records

2. **Doctor**
   - Manage appointments with patients
   - Provide prescriptions and medical advice
   - Access and review patient test reports
   - Submit feedback based on patient interactions
   - Participate in video consultations
   - Receive real-time notifications about upcoming appointments and patient feedback via `Socket.IO`

3. **Admin**
   - Register users (Patients, Doctors, and Laboratory Operators)
   - Perform CRUD (Create, Read, Update, Delete) operations on all users
   - Generate reports and perform data analysis to monitor platform activities
   - Manage overall system operations and security
   - Receive notifications on system activity via `Socket.IO`

4. **Laboratory Operator**
   - Manage appointments for tests (ECG, CBC, etc.)
   - Upload test reports for patients
   - Collaborate with the platform's AI model to classify ECG results
   - Ensure that test results and ECG classification reports are sent to patients in a timely manner
   - Receive notifications for new test appointments and test results uploaded via `Socket.IO`

### Key Functionality

- **Appointments**: Patients and doctors can schedule, manage, and track medical and test appointments seamlessly.
- **Real-Time Communication**: Integrated chat system and video calls via Zego Cloud allow for efficient doctor-patient communication.
- **ECG Classification**: The AI model analyzes ECG data, classifies it, and sends the results alongside the uploaded reports to the patient.
- **Medical Record Tracking**: Patients can track all their medical data, including test results and prescriptions, in one place.
- **Feedback System**: Feedback can be exchanged between doctors and patients to improve service quality.
- **Real-Time Notifications**: Notifications are powered by `Socket.IO`, allowing real-time updates for patients, doctors, lab operators, and admins on events such as appointment reminders, test results, or system updates.

## Technology Stack

- **Backend**: FastAPI, Python, nodejs
- **Frontend**: Next.js (or your choice of frontend framework)
- **Database**: MongoDB (or any preferred database for storing user data and medical records)
- **Real-Time Communication**: 
  - Chat: Integrated chat functionality
  - Video: Zego Cloud API for video calls
  - Notifications: `Socket.IO` for real-time notifications
- **Machine Learning**: Custom AI model for ECG classification
- **Authentication**: JWT (JSON Web Tokens) for user authentication



