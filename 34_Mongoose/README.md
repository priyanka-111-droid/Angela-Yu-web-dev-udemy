# Section 34: Mongoose

To drop FruitsDB made earlier using MongoDB driver,

```
$ mongosh
test> show dbs
test> use fruitsDB
fruitsDB> db.dropDatabase()
```

Important points:

- Schemas
- Use schema to make model
- insertMany() and find
- Create 2 type of collections - fruits and people inside fruitsDB
- `mongoose.connection.close();` to close connection
- Mongoose validation
- update and delete data
- relationships