## MONGO
### ACTICE POMODORO
 - FOR USER WITH ACTICE POMODORO
   ```
        {
            user_id : String,
            pomodoro_id: String,
        }
   ```
 - FOR USER WITH NO ACTICE POMODORO
    ```
    {
        user_id : String,
        pomodoro_id : Null
    }
    ```

### Historic
Will return the historical pomodoros
```
    { 
        user_id: String,
        count_of_pomodoro : [
            { 
                date: Date, 
                pomodoro_type : [ 
                                    pomodoro_id,
                                    pomodoro_id
                                ]
                total: Number,
                completed: Number,
                not_completed: Number
            }
        ]
    }
```

## Pomodoro_id
```
{ 
     pomodoro_id : String,
     user_id: String, 
     task_id : String,
     StartTime: DateTime || Number,
     EndTime: DateTime || Number || Null,
     Date: Date,
     isCompleted: Bool,
     Length: Number
}
```

### Task_id
```
{
    user_id: String, 
    task_id: String,
    task_name: String
}
```