const express = require('express');
const app = express();
const port = 3003;
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const dbFile = 'northwind.db';

async function getTables(res, req) {
    try {
        // Open a connection to the SQLite database
        const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });

        // Get the names of all tables in the database
        const rows = await db.all('SELECT name FROM sqlite_master WHERE type="table"');

        // Create an empty object to store the table information
        const tables = {};

        // Iterate over the rows and get the field names and types for each table
        for (const row of rows) {
            const tableName = row.name;
            const fieldNamesAndTypes = [];

            // Get the names and types of all fields in the table
            const rows = await db.all(`PRAGMA table_info('${tableName}')`);

            // Store the field names and types in the fieldNamesAndTypes array
            for (const row of rows) {
                fieldNamesAndTypes.push({ [row.name]: row.type });
            }

            // Add the table name and field names and types to the tables object
            tables[tableName] = fieldNamesAndTypes;
        }

        // Close the database connection
        await db.close();

        // Return the tables object as JSON
        res.json({ prompt: 'I have the following database model:', data: tables });
    } catch (err) {
        // Return an error if something went wrong
        res.status(500).json({ error: err.message });
    }
}
// the init function before doing anything 
app.get('/api/sqlite/init', async (req, res) => {
    await getTables(res, req);
});
app.get('/api/sqlite/tables', async (req, res) => {
    await getTables(res, req);
});
app.get('/api/sqlite/query', async (req, res) => {
    try {
        // Open a connection to the SQLite database
        const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });

        if (!req.query.q) {
            res.status(400).json({ type: 'code', var: 'q', prompt: 'please provide sql for the following' });
            return;
        }

        // Get the query from the URL query string
        const query = req.query.q;

        // Execute the query
        const rows = await db.all(query);

        // Close the database connection
        await db.close();

        // Return the result of the query as JSON
        res.json(rows);
    } catch (err) {
        // Return an error if something went wrong
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
