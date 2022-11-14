# **Technical Project Assignment (TPA) #5 - Web Service & RESTful API for ToDoList Application**

Membuat Web Service & RESTful API for ToDoList Application dengan menggunakan database mongodb

## Domain

**PUBLIC_URL :** `https://todos-zekais.herokuapp.com`

## Fitur

-   **User**

    | Fitur User |   EndPoint    | Method |
    | :--------: | :-----------: | :----: |
    |  Register  | /users/signup |  POST  |
    |   Login    | /users/signin |  POST  |
    |   Logout   | /users/logout |  GET   |

-   **Todo**

    |      Fitur Todo      |     EndPoint      | Method |
    | :------------------: | :---------------: | :----: |
    |     Create Todo      |      /todos/      |  POST  |
    |  Get All User Todo   |      /todos/      |  GET   |
    |   Get Detail Todo    | /todos/:\_id-todo |  GET   |
    |     Update Todo      | /todos/:\_id-todo |  PUT   |
    | Delete All User Todo |      /todos/      | DELETE |
    |   Delete One Todo    | /todos/:\_id-todo | DELETE |

### Endpoint User

Beberapa Endpoint User Seperti Register, Login dan Logout

#### **Register/Sign Up**

-   **Method : POST**
-   **URL :** `{{PUBLIC_URL}}/users/signup`
-   **Header :**
    -   Content-Type: application/json
-   **Body :**
    ```json
    {
    	"email": "tes3@gmail.com",
    	"password": "tes123",
    	"confirmPassword": "tes123"
    }
    ```
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes Create Account Email : tes3@gmail.com"
    }
    ```

#### **Login/Sign Up**

-   **Method : POST**
-   **URL :** `{{PUBLIC_URL}}/users/signin`
-   **Header :**
    -   Content-Type: application/json
-   **Body :**
    ```json
    {
    	"email": "tes3@gmail.com",
    	"password": "tes123"
    }
    ```
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Logged In Successfully",
    	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzcxOTg5YjNhZTJiN2NlYjBkMGU4MmEiLCJpYXQiOjE2NjgzODkxNDUsImV4cCI6MTY2ODU2MTk0NX0.tv010tpw4sZ8ke34Ia4RTepSsXu-PxRr1mjkimwcm4w"
    }
    ```

#### **Logout**

-   **Method : GET**
-   **URL :** `{{PUBLIC_URL}}/users/logout`
-   **Header :**
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Logout Sukses, Token invalidated"
    }
    ```

### Endpoint TODO

Beberapa Endpoint Todo Seperti Create Todo, Get Detail Todo, dll

#### **Create Todo**

-   **Method : POST**
-   **URL :** `{{PUBLIC_URL}}/todos`
-   **Header :**
    -   Content-Type: application/json
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Body :**
    ```json
    {
    	"title": "todo 1",
    	"content": "content 1"
    }
    ```
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes Create Todo",
    	"data": {
    		"detail": {
    			"title": "todo 1",
    			"content": "content 1",
    			"date": "14/11/22 08:23:36",
    			"_id": "63719a393ae2b7ceb0d0e832"
    		}
    	}
    }
    ```

#### **Get All User Todo**

-   **Method : GET**
-   **URL :** `{{PUBLIC_URL}}/todos/`
-   **Header :**
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes GET Detail Todo",
    	"data": {
    		"list": [
    			{
    				"title": "todo 1",
    				"content": "content 1",
    				"date": "14/11/22 08:23:36",
    				"_id": "63719a393ae2b7ceb0d0e832"
    			}
    		]
    	}
    }
    ```

#### **Get Detail Todo**

-   **Method : GET**
-   **URL :** `{{PUBLIC_URL}}/todos/:_id-todo`
-   **Header :**
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Request URL**
    `{{PUBLIC_URL}}/todos/63719a393ae2b7ceb0d0e832`
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes GET Detail Todo",
    	"data": {
    		"detail": {
    			"title": "todo 1",
    			"content": "content 1",
    			"date": "14/11/22 08:23:36",
    			"_id": "63719a393ae2b7ceb0d0e832"
    		}
    	}
    }
    ```

#### **Update Todo**

-   **Method : PUT**
-   **URL :** `{{PUBLIC_URL}}/todos/:_id-todo`
-   **Header :**
    -   Content-Type: application/json
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Request URL :**
    `{{PUBLIC_URL}}/todos/63719a393ae2b7ceb0d0e832`
-   **Example Body :**

    ```json
    {
    	"title": "todo update",
    	"content": "content updat"
    }
    ```

-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes Update Todo",
    	"data": {
    		"detail": {
    			"title": "todo update",
    			"content": "content updat",
    			"date": "14/11/22 08:23:36",
    			"_id": "63719a393ae2b7ceb0d0e832"
    		}
    	}
    }
    ```

#### **Delete One Todo**

-   **Method : DELETE**
-   **URL :** `{{PUBLIC_URL}}/todos/:_id-todo`
-   **Header :**
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Request URL :**
    `{{PUBLIC_URL}}/todos/63719d51e1e15a302fcd6986`
-   **Example Response : (list: menampilkan todo lainnya dari user)**
    ```json
    {
    	"status": 200,
    	"message": "Succes Delete Todo With ID : 63719d51e1e15a302fcd6986",
    	"data": {
    		"list": [
    			{
    				"title": "todo 2",
    				"content": "content 2",
    				"date": "14/11/22 08:43:30",
    				"_id": "63719d5be1e15a302fcd698f"
    			}
    		]
    	}
    }
    ```

#### **Delete All Todo**

-   **Method : DELETE**
-   **URL :** `{{PUBLIC_URL}}/todos/:_id-todo`
-   **Header :**
    -   Authorization: Bearer {{TOKEN_JWT}}
-   **Example Request URL :**
    `{{PUBLIC_URL}}/todos/`
-   **Example Response :**
    ```json
    {
    	"status": 200,
    	"message": "Succes Delete Todo",
    	"data": {
    		"list": []
    	}
    }
    ```
