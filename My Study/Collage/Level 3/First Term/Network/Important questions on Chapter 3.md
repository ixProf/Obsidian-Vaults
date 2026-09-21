

### **1. Which of the following is false with respect to TCP?**

- A) Connection-oriented
    
- B) Transport layer protocol
    
- C) Unreliable
    

---

### **2. The only control that the application developer has on the transport-layer side is**

- A) The choice of transport protocol
    
- B) The choice of link protocol
    
- C) The choice of network protocol
    

---

### **3. Which is not an application layer protocol?**

- A) HTTP
    
- B) SMTP
    
- C) TCP
    

---

### **4. In the layer hierarchy, as the data packet moves from the upper to the lower layers, headers are**

- A) Added
    
- B) Removed
    
- C) Rearranged
    

---

### **5. …… provides a connection-oriented reliable service for sending messages**

- A) TCP
    
- B) IP
    
- C) UDP
    

---

### **6. One of the fields in a UDP segment header is**

- A) Sequence number
    
- B) Internet checksum
    
- C) Flow control window
    
- D) Acknowledgement number
    

---

### **7. Which of the following is a service provided by TCP but not by UDP?**

- A) Data transfer
    
- B) Congestion control
    
- C) Checksum
    
- D) Port numbers
    

---

### **8. In the Internet protocol stack, the transport layer's packet is called a**

- A) Datagram
    
- B) Message
    
- C) Segment
    
- D) Frame
    

---

### **9. Which transport-layer protocol provides a "best effort" service with no guarantees?**

- A) TCP
    
- B) UDP
    
- C) HTTP
    
- D) FTP
    

---

### **10. What is the size of a UDP packet header?**

- A) 8 byte header
    
- B) 20 byte header
    
- C) 40 byte header
    
- D) 60 byte header
    

---

### **11. User Datagram Protocol is called connectionless because**

- A) All UDP packets are treated independently by the transport layer
    
- B) It sends data as a stream of related packets
    
- C) It is received in the same order as sent
    

---

### **12. Transmission Control Protocol**

- A) Is a connection-oriented protocol
    
- B) Uses a three-way handshake to establish a connection
    
- C) Receives data from application as a single stream
    
- D) All of the mentioned
    

---

### **13. An endpoint of an inter-process communication flow across a computer network is called**

- A) Socket
    
- B) Pipe
    
- C) Port
    

---

## **ثانياً: أسئلة الصح والخطأ (True / False)**

### **14. If a protocol provides guaranteed data delivery service, it is said to provide reliable data transfer**

- True
    

---

### **15. When a transport-layer protocol doesn't provide reliable data transfer, this is not acceptable for loss-tolerant applications**

- False
    

---

### **16. In UDP there is handshaking before the two processes start to communicate**

- False
    

---

### **17. UDP provides a reliable data transfer service**

- False
    

---

### **18. In Internet protocol stack, transport layer provides process-to-process data transfer (TCP, UDP)**

- True
    

---

### **19. The application developer has full control on both application-layer side and transport-layer side of the socket**

- False

----

الاجابات

### **. Multiple Choice Questions (MCQ)**

- **Which of the following is false with respect to TCP?**
    
    - **Answer**: **unreliable**. (Note: TCP is a reliable protocol).
        
- **The only control that the application developer has on the transport-layer side is:**
    
    - **Answer**: **the choice of transport protocol**.
        
- **One of the fields in a UDP segment header is:**
    
    - **Answer**: **Internet checksum**.
        
- **Which protocol provides a connection-oriented reliable service for sending messages?**
    
    - **Answer**: **TCP**.
        
- **In the internet protocol stack, the transport layer's packet is called a:**
    
    - **Answer**: **Segment**.
        
- **Which transport-layer protocol provides a "best effort" service with no guarantees?**
    
    - **Answer**: **UDP**.
        
- **What is the size of a UDP packet header?**
    
    - **Answer**: **8 byte header**.
        
- **Which of the following is a service provided by TCP but not by UDP?**
    
    - **Answer**: **Congestion control**.
        
- **Transport-layer functionality is primarily implemented in:**
    
    - **Answer**: **The hosts at the "edge" of the network**.
        
- **Which address identifies a process on a host?**
    
    - **Answer**: **port address**.
        

---

### **II. True or False Questions**

- **In the Internet protocol stack, transport layer is responsible for process-to-process data transfer (TCP, UDP).**
    
    - **Answer**: **True**.
        
- **In UDP there is handshaking before the two processes start to communicate.**
    
    - **Answer**: **False**. (UDP is connectionless).
        
- **UDP provides a reliable data transfer service.**
    
    - **Answer**: **False**.
        
- **If a protocol provides a guaranteed data delivery service, it is said to provide reliable data transfer.**
    
    - **Answer**: **True**.
        
- **The application developer has control of everything on the application-layer side of the socket and has control of everything of the transport-layer side of the socket.**
    
    - **Answer**: **False**. (Developers have very limited control over the transport layer).
        

---

### **III. Key Definitions from the Test Bank**

- **Socket**: An endpoint of an inter-process communication flow across a computer network.
    
- **TCP (Transmission Control Protocol)**: A connection-oriented protocol that uses a three-way handshake to establish a connection.
    
- **UDP (User Datagram Protocol)**: Called connectionless because all UDP packets are treated independently by the transport layer.