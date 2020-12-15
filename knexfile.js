// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, 
    connection: {
      filename: './data/users-table.sqlite3'
    }, 
    migrations: {
      directory: "./data/migrations", 
    }
  },
};
