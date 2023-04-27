# Available Scripts

In the project directory, you can run:

### `npm run generateKeyPair`

Create Key pair for Authentication Utils

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run lint`

Run Linter and fix fixable issues

### `npm run coverage`

Generate Coverage Report

### `npm run prod`

Run backend with production build

### Environment Variables(.env)

1. `LOG_LEVEL=debug`
2. `PROJECT_NAME=Driven`
3. `DB_URI="mongodb://user:password@hostName:port/DBName?authSource=admin"`
4. `HOST=0.0.0.0`
5. `PORT=8003`
6. `SECRET=cats`
7. `PYTHON_PATH=python3`
8. `VIN_SCRIPT_PATH=./scripts/get_vin_info.py`
9. `HOST_ADDRESS=http://localhost:8003`
10. ` VALUATION_API_URL=http://VALUATION_API_URL:post`
11. ` GET_KEYSCRIPT_PATH=./scripts/get_key.py`
12. ` SQLHOST=sql_host`
13. ` SQLPORT=sql_port`
14. ` SQLPASSWORD=sqlPassword`
15. ` SQLDATABASE=DB_NAME`

# Instance details

1. https://staging.driven.perpetualblock.io/
2. https://sandbox.driven.perpetualblock.io/

# Technology stack

1. Node v16
2. Express
3. MongoDB (https://www.mongodb.com/docs/manual/tutorial/getting-started/)
4. Mongoose (https://mongoosejs.com/docs/)
5. Docker (For deployment ) (https://docs.docker.com/get-started/)

# How to start project?

1. Clone the project
   $ git clone https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/Project_Driven_Backend
2. Branch details

   1. main branch feature/code_refactor
   2. https://sandbox.driven.perpetualblock.io/(git branch feature/code_refactor )
   3. https://staging.driven.perpetualblock.io/(git branch feature/code_refactor)

3. Go to new_code
   $ cd Backend
4. Install dependancies
   $ npm i
5. Create .env and set all the env variables which are give above in Environment Variables section
6. Then genrate key pair by running following cmd
   $ npm run generateKeyPair
7. To start project
   $ npm start
8. To run tests
   $ npm test

# How to start production environment

1. To do automated deployment.
   $ cd /data/deployment-scripts
   $ ./driven_script_v1.sh
   $ cat driven_script_v1.sh to know docker scripts path (art_backend2.sh only for artworkv2)
2. To change production docker image make changes in Dockerfile
   $ docker build /path/to/your/dockerfile -t driven
3. To deploy project in production make changes in docker-compose.yaml
   $ docker-compose -f docker-compose.yaml up -d

# How to add new module?

1. Create module folder under src/component new_module.
2. Add controller to src/index.js (main controller file).
3. Create src/components/new_module/route.js to add route information to src/routes/index.js
4. Create src/components/new_module/model.js to add mongoose model functions.
5. Create src/components/new_module/new_module/services.js to add db query functions.
6. Create src/components/new_module/serializer.js to add response data formatting functions.

# How to add test file?

1. Create test/componets/new_module.spec.js to add api test functions.
2. Add test entry to test.js(main route file).
3. To run tests
   $ npm test

# Resources

1. https://docs.docker.com/get-started/
2. https://www.mongodb.com/docs/manual/tutorial/getting-started/
3. https://mongoosejs.com/docs/
4. For api validations https://joi.dev/api/?v=17.6.0
