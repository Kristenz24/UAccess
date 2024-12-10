# UAccess: UA Enrollment System

***UAccess*** was one of my simple final projects in my third year. This web application performs basic CRUD operations and is designed to efficiently manage and access user data.

## Obtaining a Copy
- Fork the repository and clone it to your local machine or download the project as ZIP.

## Installing the Dependencies
### Installing the dependencies on the ``backend``:

- Traverse to the system-be (backend) directory
```bash
cd system-be/
```

- Run npm install to install the dependencies
```bash
npm install
```

- Go back to the main directory:
```bash
cd ..
```

### Installing the dependencies on the ``frontend``:

- Traverse to the system-client (frontend) directory
```bash
cd system-client
```

- Run npm install to install the dependencies
```bash
npm install
```

- Go back to the main directory:
```bash
cd ..
```

## Setting up Environmental Variables
- Traverse to the system-be and create a new file named ```.env```

```bash
cd system-be
```

- Go to the ```.env``` file you created and paste this:
```bash
PORT=4000
MONGODB_STRING=""
JWT_SECRET_KEY="MWDBESECRET"
```
> NOTE : You must use your own MongoDB SRV String for it to work.

## Running The Project
- To run the backend. traverse to ```system-be``` and run ```npm run dev``` 
```bash
npm run dev
```

- To run the frontend. traverse to ```system-client``` and run ```npm start``` 
```bash
npm start
```
