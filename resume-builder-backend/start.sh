#!/bin/sh

set -e

echo "🚀 Starting Laravel API..."

cd /var/www

echo "🧹 Clearing old caches..."
php artisan optimize:clear || true

echo "⚙️ Rebuilding caches..."
php artisan config:cache
php artisan route:cache
php artisan view:clear

echo "⏳ Waiting for database connection..."

# Wait until Neon Postgres is reachable
until php -r "
try {
    new PDO(
        'pgsql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
    echo 'DB connected';
} catch (Exception \$e) {
    exit(1);
}
"; do
  echo "Database not ready... retrying in 2s"
  sleep 2
done

echo "✅ Database connected"

echo "🗄 Running migrations..."
php artisan migrate --force

echo "🔥 Starting server..."
exec php artisan serve --host=0.0.0.0 --port=8000
