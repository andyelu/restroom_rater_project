import mysql from "mysql2";
import { Client } from 'ssh2';
import dotenv from 'dotenv';

dotenv.config();

// SSH tunnel configuration
const tunnelConfig = {
  username: process.env.TUNNEL_USERNAME,
  privateKey: 'private-subnet.pem',
  host: process.env.TUNNEL_HOST,
  port: 22, // Default SSH Port
  dstHost: process.env.TUNNEL_ENDPOINT,
  dstPort: process.env.TUNNEL_PORT,
  localHost: '127.0.0.1',
  localPort: 3306,
};

// RDS database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create an SSH tunnel to the jump box
const sshTunnel = new Client();

sshTunnel.on('ready', () => {
  sshTunnel.forwardOut(
    tunnelConfig.localHost,
    tunnelConfig.localPort,
    tunnelConfig.dstHost,
    tunnelConfig.dstPort,
    (err, stream) => {
      if (err) throw err;

      // Connect to the RDS database through the SSH tunnel
      const connection = mysql.createConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        stream: stream, // Use the SSH tunnel stream
      });

      connection.connect((err) => {
        if (err) throw err;

        // Perform your database operations here
        // For example, you can use connection.query() to execute SQL queries.

        // Close the database connection when done
        connection.end();
        sshTunnel.end();
      });
    }
  );
});

// Connect to the jump box
sshTunnel.connect(tunnelConfig);

// Handle errors
sshTunnel.on('error', (err) => {
  console.error('SSH Tunnel Error:', err);
});