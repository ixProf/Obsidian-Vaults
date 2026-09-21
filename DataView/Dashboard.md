 # 🏠 Dashboard

## 📅 النهارده
```dataview
TABLE WITHOUT ID file.link AS "اليوم"
FROM "Daily Notes"
WHERE file.day = date(today)
```

## ✅ تاسكات النهارده
```dataview
TASK
WHERE !completed
AND due = date(today)
SORT priority DESC
```

## ⚠️ تاسكات متأخرة
```dataview
TASK
WHERE !completed
AND due < date(today)
SORT due ASC
```

## 📋 كل التاسكات الجاية
```dataview
TASK
WHERE !completed
AND due > date(today)
SORT due ASC
LIMIT 5
```
