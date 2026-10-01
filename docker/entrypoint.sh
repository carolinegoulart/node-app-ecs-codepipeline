#!/bin/sh
set -e

echo "[entrypoint] waiting for the database to be ready..."

# Wait for the database to be ready
until nc -z $PG_HOST $PG_PORT; do
  echo "Waiting for the database at $PG_HOST:$PG_PORT..."
  sleep 6
done

echo "[entrypoint] knex migrate:latest"
npm run migrate

echo "[entrypoint] knex seed:run"
npm run seed

echo "[entrypoint] start API"
exec npm start