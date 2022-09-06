# JuanBreath: Contact Tracing Backend

This is my thesis backend server, the main goal of this is to provide data management and encrypted data transfer when needed for the contact tracing application.

## Structure

This project is currently divided into 3:

-   \_seeders - `Data seeder to populate the database`
-   .vscode - `VS Code Config files`
-   bin `_seeder start script`
-   build `Contains the builded file for the server`
-   src `Contains the features of the server`

## Development Stack

This project is make posible using the following languages

1. **Javascript**
2. **MongoDB**
3. **TypeScript**
4. **Express**
5. **Node.JS**

## Getting Started

Use the git manager [git](https://git-scm.com/) to install the project.

```bash
    git clone https://github.com/MrZeal025/thesis_backend.git server
```

Installation of the required dependencies

```bash
    # this will install all dependencies
    yarn

    # this will generate random data
    yarn seed

    #this will run the project in the development start
    yarn start:dev

    #this will run the project in a production mode like - it will call the start up file inside the build folder
    yarn build
    yarn start:prod
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## **Lead Developer**

-   Ryan Nograles :bowtie:
