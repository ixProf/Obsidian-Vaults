---
title: "DEPI - Assignment 2 - DevOps"
aliases: []
type: source
status: active
domain: devops-infrastructure
tags: [source, devops-infrastructure, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

```bash
EMP_FILE="employees.txt"


touch "$EMP_FILE"


add_employee() {
    read -p "Enter employee name: " name


    if [ -z "$name" ]; then
        echo "Employee name cannot be empty."
        return
    fi


    if grep -Fxq "$name" "$EMP_FILE"; then
        echo "Employee already exists."
    else
        echo "$name" >> "$EMP_FILE"
        echo "Employee added successfully."
    fi
}


search_employee() {
    read -p "Enter employee name: " name

    if [ -z "$name" ]; then
        echo "Employee name cannot be empty."
        return
    fi

    found=0


    while IFS= read -r employee; do
        if [ "$employee" = "$name" ]; then
            found=1
            break
        fi
    done < "$EMP_FILE"

    if [ $found -eq 1 ]; then
        echo "Employee found."
    else
        echo "Employee not found."
    fi
}


list_employees() {
    echo "Employees:"

    if [ ! -s "$EMP_FILE" ]; then
        echo "No employees found."
        return
    fi

    count=1
    while IFS= read -r employee; do
        echo "$count. $employee"
        ((count++))
    done < "$EMP_FILE"
}


while true
do
    echo
    echo "===== Employee Management ====="
    echo "1. Add Employee"
    echo "2. Search Employee"
    echo "3. List Employees"
    echo "4. Exit"

    read -p "Choose an option: " choice

    case $choice in
        1)
            add_employee
            ;;
        2)
            search_employee
            ;;
        3)
            list_employees
            ;;
        4)
            echo "Goodbye!"
            break
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
done
```