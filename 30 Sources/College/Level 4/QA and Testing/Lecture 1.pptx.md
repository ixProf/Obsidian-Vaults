---
title: "Lecture 1.pptx"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering, course]
created: 2026-10-16
updated: 2026-10-16
source:
related: []
---
# DIKW Hierarchy

- Data
	- Unorganized, raw symbols, facts, or observations without context.
- Information
	- Processed, Structured data given context, Meaning, and Purpose
- Knowledge
	- Synthesized information internalized by humans through experience, learning, and reeasoning to enable action

![[Pasted image 20261016230543.png]]

# Data Quality Dimensions

- Accuracy
	- The Degree to which data correctly reflects the real-world object or event it represents.
- Completeness
	- The extent to which all required data value are present without missing attributes.
- Consistency
	- The absence of contradictions across different datasets, tables, or systems
- Timeliness
	- How up-to-data the data is relative to when the real-world event occurred
- Reliability
	- The Trust placed in data based on steady, repeatable collection and pipeline stability
- Relevance 
	- The applicability and utility of the data for a specific user, task, or business decision.
- Accessibility
	- The ease and speed with which authorized users can retrieve and query the data.
- Security
	- The protection of data against unauthorized access, leaks, corruption, or tampering

## Trade-offs

### Timeliness vs Accuracy

- Timeliness: Data is ==available quickly and reflects== recent events.
- Accuracy: Data is ==carefully validated to ensure correctness.==

- Trade-off: ==Collecting and validating data takes time==, while delivering it quickly may increase the risk of errors.

- Example: A real-time stock price may be available instantly but could be preliminary or inaccurate, while a verified price may take longer to confirm.


### Accessibility vs Security

- Accessibility: Authorized users can easily and quickly access data.
    
- Security: Data is protected against unauthorized access and misuse.
    
- Trade-off: Strong security measures, such as strict authentication and access restrictions, can make accessing data slower or more complicated.
    
- Example: Requiring multi-factor authentication improves security but adds extra steps when users log in.
    

### Completeness vs Relevance

- Completeness: All required data values and attributes are present.
    
- Relevance: Data is directly useful for a specific task or decision.
    
- Trade-off: Collecting more data can improve completeness, but it may also introduce unnecessary information that makes analysis more difficult.
    
- Example: A customer database containing every detail about customers may be complete, but including irrelevant personal information can make analyzing purchasing behavior more complicated.

---
# Information System

An **Information System (IS)** is an integrated set of interconnected components that work together to collect, store, process, and communicate data and information to support decision-making, coordination, control, analysis, and visualization of operations.

## Components of an Information System

- **Hardware**
    
    - The physical equipment used to process and store data, such as servers, computers, and network devices.
        
- **Software**
    
    - The programs and applications that control data processing, such as operating systems, DBMS, and business applications.
        
- **Data**
    
    - Raw facts and figures stored in databases before being processed into meaningful information.
        
- **People**
    
    - The users, analysts, developers, and administrators who operate and interact with the system.
        
- **Procedures**
    
    - The rules, policies, and workflows that define how data is collected, processed, and utilized.
        

## Quality

Quality is the degree to which a set of inherent characteristics fulfills requirements.

### Garvin's 8 Dimensions of Quality

1. **Performance:** ==How well a product performs== its primary functions.
    
2. **Features:** ==Additional characteristics that enhance== the product's functionality.
    
3. **Reliability:** The ==ability to perform consistently without failure.==
    
4. **Conformance:** The ==degree to which a product meets specified standards== and requirements.
    
5. **Durability / Scalability:** Durability refers to ==how long a product remains usable==, while scalability refers to its ==ability to handle increased workloads.==
    
6. **Serviceability / Maintainability:** ==How easily a product can be repaired, maintained, or improved==.
    
7. **Aesthetics:** ==The product's appearance, design, and sensory characteristics.==
    
8. **Perceived Quality:** ==The user's overall impression of quality based on reputation==, experience, and other indirect factors.
    

## Information System Quality (ISQ)

Information System Quality ==is the degree to which an information system meets defined requirements==, user needs, and organizational objectives while providing reliable, accurate, secure, and useful information and services.

### Characteristics of a High-Quality Information System

A high-quality information system should provide:

- **Accurate information:** Correctly represents real-world objects and events.
    
- **Complete information:** Contains all required data.
    
- **Consistent information:** Avoids contradictions across different sources.
    
- **Timely information:** Is available when needed.
    
- **Reliable information:** Can be trusted due to stable data collection and processing.
    
- **Secure information:** Is protected against unauthorized access and misuse.
    
- **Relevant information:** Supports specific user needs and business decisions.
    

### Main Focus of IS Quality

Information Systems Quality ensures that the system meets organizational objectives and user needs by maintaining the quality of its:

- Software
- Data
- Processes
- People
    
- Technology and infrastructure
    
- Services
    

IS Quality also ==integrates quality assurance==, quality control, software and information quality, testing, quality measurement, standards, and continuous improvement throughout the system lifecycle.

## Software Quality (SQ)

Software Quality ==is the degree to which software meets specified requirements, satisfies user needs, and performs its intended functions effectively==, reliably, and securely.

### Software Quality vs Information Systems Quality

- **Software Quality (SQ):** ==Focuses specifically on the software product,== its functionality, performance, security, reliability, and technical requirements.
    
- **Information Systems Quality (ISQ):** ==Covers the entire information system ecosystem, including software, hardware==, data, people, processes, and infrastructure.
    

### Relationship Between SQ and ISQ

Software Quality is a ==key subset of Information Systems Quality==, but excellent software alone does not guarantee a high-quality information system.

A high-quality information system must also deliver accurate data, streamline business processes, satisfy users, and fulfill organizational goals.

**Example:** A hospital system may have excellent software, but if patient records are inaccurate or staff follow incorrect procedures, the overall information system is still low-quality.