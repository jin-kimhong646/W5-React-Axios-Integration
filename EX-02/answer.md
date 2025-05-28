1. How do sub-resource routes like /journalists/:id/articles help in designing a clear and organized API?
=> They group related data under a parent resource, making the API easier to understand and more intuitive.

2. What challenges did you face when managing multiple filter states (journalist and category) in React?
=> Synchronizing both filters and making sure the correct data was fetched without unnecessary reloads was challenging.

3. What are the pros and cons of frontend vs. API-based filtering?
=> - Frontend filtering is faster but only works after all data is loaded.
   - API filtering is more efficient with large data and keeps the UI responsive but requires backend support.

4. How would you modify the API to allow filtering by both journalist and category at once?
=> Use query parameters like:
    GET /articles?journalistId=1&categoryId=2

5. How did this exercise help you understand the interaction between React state, form controls, and RESTful API data?
=> It showed how state and form changes trigger API calls, which then update the UI—making the connection between user input and data rendering clear.