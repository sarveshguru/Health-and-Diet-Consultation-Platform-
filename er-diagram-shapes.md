# ER Diagram with Shapes - Health & Diet Consultation Platform

## Entity Relationship Diagram (Standard ER Notation)

```mermaid
erDiagram
    %% Entities with proper shapes
    USER {
        string _id PK
        string name
        string email UK
        string password
        int age
        float weight
        float height
        string gender
        array healthRecords
    }

    DIETICIAN {
        string _id PK
        string name
        string email UK
        string password
        string specialization
        int experienceYears
        string qualifications
        string bio
    }

    APPOINTMENT {
        string _id PK
        date date
        string timeSlot
        string notes
        string plan
        string status
        datetime createdAt
        datetime updatedAt
    }

    MESSAGE {
        string _id PK
        string senderId FK
        string receiverId FK
        string content
        datetime timestamp
    }

    BMI_HISTORY {
        string _id PK
        float bmi
        date date
        datetime createdAt
        datetime updatedAt
    }

    FOOD_ANALYSIS {
        string _id PK
        string imageUrl
        string food
        float calories
        float proteins
        float carbs
        float fats
        float fiber
        datetime createdAt
        datetime updatedAt
    }

    DIET_PLAN {
        string _id PK
        object planDetails
        string duration
        array goals
    }

    DIETICIAN_AVAILABILITY {
        string _id PK
        date date
        array timeSlots
        boolean isBooked
    }

    USER_DETAILS {
        string _id PK
        object additionalInfo
    }

    %% Relationships with proper cardinality
    USER ||--o{ APPOINTMENT : "schedules"
    USER ||--o{ BMI_HISTORY : "has"
    USER ||--o{ FOOD_ANALYSIS : "analyzes"
    USER ||--o{ MESSAGE : "sends/receives"
    USER ||--o{ USER_DETAILS : "has"

    DIETICIAN ||--o{ APPOINTMENT : "provides"
    DIETICIAN ||--o{ DIET_PLAN : "creates"
    DIETICIAN ||--o{ MESSAGE : "sends/receives"
    DIETICIAN ||--o{ DIETICIAN_AVAILABILITY : "has"

    APPOINTMENT }o--|| USER : "belongs to"
    APPOINTMENT }o--|| DIETICIAN : "with"

    BMI_HISTORY }o--|| USER : "belongs to"
    FOOD_ANALYSIS }o--|| USER : "belongs to"

    MESSAGE }o--|| USER : "from/to"
    MESSAGE }o--|| DIETICIAN : "from/to"

    DIET_PLAN }o--|| USER : "for"
    DIET_PLAN }o--|| DIETICIAN : "created by"

    DIETICIAN_AVAILABILITY }o--|| DIETICIAN : "belongs to"
    USER_DETAILS }o--|| USER : "belongs to"
```

## Shape Legend

### Entity Shapes:

- **Rectangle (□)**: Represents entities (User, Dietician, etc.)
- **Diamond (◇)**: Represents relationships between entities
- **Oval (○)**: Represents attributes of entities

### Cardinality Symbols:

- **||**: One and only one
- **o{**: Zero or many
- **}|**: Many to one

### Key Symbols:

- **PK**: Primary Key (underlined)
- **FK**: Foreign Key (italic)
- **UK**: Unique Key (double underline)

## Visual ER Diagram with Shapes

### High-Level Overview

```
┌─────────────────┐          ┌──────────────────┐
│      USER       │          │    DIETICIAN     │
├─────────────────┤          ├──────────────────┤
│ _id (PK)        │          │ _id (PK)         │
│ name            │          │ name             │
│ email (UK)      │          │ email (UK)       │
│ password        │          │ password         │
│ age             │          │ specialization   │
│ weight          │          │ experienceYears  │
│ height          │          │ qualifications   │
│ gender          │          │ bio              │
│ healthRecords   │          │                  │
└─────────────────┘          └──────────────────┘
         │                            │
         │                            │
         │                            │
    ┌────┴────┐                  ┌────┴────┐
    │         │                  │         │
    ▼         ▼                  ▼         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   APPOINTMENT   │    │     MESSAGE     │    │   BMI_HISTORY   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ _id (PK)        │    │ _id (PK)        │    │ _id (PK)        │
│ user (FK)       │    │ senderId (FK)   │    │ user (FK)       │
│ dietician (FK)  │    │ receiverId (FK) │    │ bmi             │
│ date            │    │ content         │    │ date            │
│ timeSlot        │    │ timestamp       │    │ createdAt       │
│ notes           │    │                 │    │ updatedAt       │
│ plan            │    │                 │    │                 │
│ status          │    │                 │    │                 │
│ createdAt       │    │                 │    │                 │
│ updatedAt       │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Relationship Flow

```
USER ────┬──────────────┬──────────────┬──────────────┐
         │              │              │              │
         ▼              ▼              ▼              ▼
   APPOINTMENT     BMI_HISTORY   FOOD_ANALYSIS    MESSAGE
         ▲              ▲              ▲              ▲
         │              │              │              │
DIETICIAN ────┬──────────────┬──────────────┬──────────────┐
              │              │              │              │
              ▼              ▼              ▼              ▼
        APPOINTMENT     DIET_PLAN    DIETICIAN_AVAILABILITY  MESSAGE
```

## Color-Coded ER Diagram

### Entity Colors:

- **Blue**: User-related entities
- **Green**: Dietician-related entities
- **Orange**: Appointment/Scheduling entities
- **Purple**: Health tracking entities
- **Red**: Communication entities

### Relationship Colors:

- **Solid lines**: Strong relationships (mandatory)
- **Dashed lines**: Weak relationships (optional)
- **Bold lines**: Identifying relationships

## Usage Instructions

1. **View the diagram**: Open `er-diagram-shapes.md` in any Markdown viewer
2. **Edit entities**: Modify the Mermaid code to add/remove attributes
3. **Update relationships**: Change cardinality symbols as needed
4. **Export**: Use Mermaid tools to export as PNG/SVG/PDF

## Additional Resources

- **Mermaid Live Editor**: https://mermaid.live
- **ER Diagram Tools**: dbdiagram.io, draw.io
- **Database Design**: Use this as reference for creating actual database schema
