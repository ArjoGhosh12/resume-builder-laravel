FROM php:8.3-cli-bookworm

ENV COMPOSER_IPRESOLVE=4

RUN apt-get update && apt-get install -y \
    git unzip zip curl \
    libpq-dev \
    libonig-dev \
    ca-certificates \
    && update-ca-certificates \
    && docker-php-ext-install pdo pdo_pgsql mbstring bcmath \
    && rm -rf /var/lib/apt/lists/*


# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project
COPY . .

# Clear cached files
RUN rm -f bootstrap/cache/*.php bootstrap/cache/*.tmp || true

# Install Laravel dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]

