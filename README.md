# Nimbus ☁️

  

**A Social Mental Health Support Platform**

  

---

  

## 🌟 About Nimbus

**Nimbus** (derived from the Latin word for *"cloud"*) is a safe, inclusive social platform designed to connect individuals navigating mental health challenges. Users can share experiences, seek advice, and find solidarity by posting to themed communities such as **Depression**, **Anxiety**, **Physical Health**, and more. The platform emphasizes empathy, anonymity, and peer support, acting as a digital "cloud" to uplift users through shared understanding and community-driven care.

  

---

  

## ✨ Features

- **Themed Communities**: Join or create groups tailored to specific mental health topics.

- **Secure Authentication**: Token-based user login/sessions for privacy.

- **Responsive Design**: Clean, accessible UI built with **Tailwind CSS** and **Daisy UI**, featuring **15+ customizable themes**.

- **Modern Stack**: React + TypeScript frontend, Java Spring Boot backend, MySQL database.

  

---

  

## 🛠️ How It's Made

  

### **Tech Stack**

  

#### Backend

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)

![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)

  

- **Java Spring Boot**: RESTful API handling user authentication, community/post management, and session security.

- **Spring Session & Security**: Tokenized user logins (JWT) for secure, stateless authentication.

- **Hibernate ORM**: Maps Java objects to MySQL tables, ensuring seamless database interactions.

  

#### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Daisy UI](https://img.shields.io/badge/Daisy_UI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

  

- **React + TypeScript**: Dynamic, type-safe components for a smooth user experience.

- **Tailwind CSS**: Utility-first styling for responsive, modern interfaces.

- **Daisy UI**: Prebuilt component library with **15+ themes** for customizable and accessible design.

- **State Management**: React hooks and context for efficient data flow.

  

#### Database

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

  

- **MySQL**: Relational database storing user profiles, community data, and posts.

- **Hibernate Integration**: Automates schema generation and query optimization.

  

---

  

## 🚀 Installation

  

To run **Nimbus** locally, follow these steps:

  

### Prerequisites

- **Node.js** (for the frontend)

- **Java JDK** (for the backend)

- **MySQL** (for the database)

  

### Steps

1. **Clone the repository**:

```bash

git clone https://github.com/Twincasper/nimbus.git

cd nimbus
```

2. **Set up the database**:

- Create a new schema in your MySQL server named nimbus.
- If your mysql server does not run on port 3306, change 3306 to the port you're using. 
- Update the application.properties file in the back-end with your MySQL credentials:

```bash

spring.datasource.url=jdbc:mysql://localhost:3306/nimbus

spring.datasource.username={username}

spring.datasource.password={password}
```

3. **Run the backend**:

```bash
cd backend
mvn spring-boot:run
```
4. **Run the frontend**:
- The localhost url will show up in the terminal after these steps.

```bash
cd ../frontend
npm install
npm run dev
```

