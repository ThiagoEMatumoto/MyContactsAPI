import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "mycontacts",
});

client.connect();

async function query(query, values) {
  const { rows } = await client.query(query, values);
  return rows;
}

export default query;
