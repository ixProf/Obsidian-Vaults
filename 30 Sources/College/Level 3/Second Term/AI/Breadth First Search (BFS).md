---
title: "Breadth First Search (BFS)"
aliases: []
type: source
status: active
domain: ai-machine-learning
tags: [source, ai-machine-learning, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
## Breadth First Search (BFS) في الـ Graph
## 💡 الفكرة الأساسية

**BFS = Breadth First Search**

يعني:

> بنمشي في الجراف "بالعرض" (Level by Level)

مش بنغوص لجوه زي DFS، لا… بنزور كل الجيران الأول، بعد كده نروح للـ level اللي بعده.

---

## 🧠 بيشتغل إزاي؟

بيعتمد على **Queue (طابور)**

### الخطوات:

1. نبدأ من Node معينة (Start Node)
    
2. نحطها في الـ Queue
    
3. نكرر:
    
    - نطلع عنصر من الـ Queue
        
    - نزور كل الجيران بتوعه
        
    - لو الجار لسه متزارش → نحطه في الـ Queue
        

---

## 🔍 مثال بسيط

### الجراف:

![Image](https://images.openai.com/static-rsc-4/_YorbNML_87X3R5UXxAIn60Res_DtK6F5PPqU6rczzooYv9GsDyWVrs8NmzB9IJL9nRfrFfot8dn8dAB8de2kStYgmgFP2pRTUcQLySIfXXkFVVAHEGEzQHB5drzEAchImxn4rMGGIrmCYzONu-9IhdvvYCcEPMhol1Q5fI2_DurClPluZcCEOa5rQWipqVf?purpose=fullsize)



لو بدأنا من node A:

### ترتيب الزيارة:

```
A → B → C → D → E → F
```

ليه؟

- الأول A
    
- بعد كده كل اللي حواليه (B, C)
    
- بعد كده اللي حواليهم (D, E, F)
    

---

## 🧾 الكود (C# مثال)

```csharp
using System;
using System.Collections.Generic;

class Graph
{
    private Dictionary<int, List<int>> adjList = new Dictionary<int, List<int>>();

    public void AddEdge(int u, int v)
    {
        if (!adjList.ContainsKey(u))
            adjList[u] = new List<int>();

        adjList[u].Add(v);
    }

    public void BFS(int start)
    {
        Queue<int> queue = new Queue<int>();
        HashSet<int> visited = new HashSet<int>();

        queue.Enqueue(start);
        visited.Add(start);

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            Console.Write(node + " ");

            foreach (var neighbor in adjList[node])
            {
                if (!visited.Contains(neighbor))
                {
                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
}
```

---

## ⚙️ التعقيد (Complexity)

- **Time Complexity:**  
    `O(V + E)`  
    (عدد الـ Nodes + عدد الـ Edges)
    
- **Space Complexity:**  
    `O(V)`
    

---

## 📌 استخدامات BFS

BFS مهم جدًا وبيستخدم في:

- إيجاد **أقصر طريق (Shortest Path)** في Graph غير موزون
    
- Social networks (زي suggest friends)
    
- Web crawling
    
- GPS systems
    
- Level order traversal في Trees
    

---

## 🔥 الفرق السريع بين BFS و DFS

|Feature|BFS|DFS|
|---|---|---|
|الاتجاه|عرض (Level)|عمق|
|Data Structure|Queue|Stack / Recursion|
|أفضل استخدام|Shortest Path|Explore deep paths|

---

لو عايز بعد كده:

- أحول BFS لـ API logic (مثلاً في recommendation system)
    
- أو أطبقه على Tree أو Database relations
    

قولّي 👌