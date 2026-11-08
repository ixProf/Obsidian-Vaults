---
title: "CI CD Intro"
aliases: []
type: source
status: active
domain: devops-infrastructure
tags: [source, devops-infrastructure, course]
created: 2026-10-04
updated: 2026-10-04
source:
related: []
---
# What is CI/CD

CI is Continues Integration

كل شوية بنعمل Integration للجديد على الكود القديم

CD is Continues Delivery 
CD is Continues Deployment

الفرق ما بين ال Delivery and Deployment

كل ما تintegrate كود يطلعلك Version جديد
والكود هتحتاج تعمله Deployment علشان يكون live for users ف انت هيكون عندك حلين

- يا تعمله Deploy على طول
- يا تعمله Deliver و حد غيرك يعمله Deploy

في ال Production احنا بنعمل Delivery

![[Pasted image 20261004164242.png]]

---
# Pipeline 
هي عبارة عن مجموعة من الخطوات او المراحل او commands وتتم ورا بعض، كل واحدة تتعتمد على الخطوة الي قبلها، يعني ال output بتاع الي قبلها عبارة عن input بتاعها

---
من ال tools الي بتحقق ال ci cd هما
- Jenkins
- GitHub Action
- GitLab-CI
دول من اشهر 3
---
