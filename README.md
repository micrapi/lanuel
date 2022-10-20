# Lanuel
A Laravel - Nuxt 3 - Element Plus starter kit.

## Installation

### Clone this repository
```
git clone https://github.com/micrapi/lanuel.git

cd lanuel
```

### Laravel
```bash
composer install

cp .env.example .env

php artisan key:generate --ansi
```

Edit .env file depend on your environment (Required: APP_URL, DB_*, NUXT_PUBLIC_API_URL).

### NuxtJs
```bash
yarn install
```

## Developer
Open 2 terminal tab for Laravel and NuxtJs server
```bash
php artisan serve
```
```bash
yarn dev
```

## Production

Use nginx as reverse proxy to run PHP and NodeJs.
Use PM2 to manage NodeJs process.

### Config nginx
```
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen 80;

    # For https
    # listen 443 ssl;
    # ssl_certificate /etc/nginx/ssl/default.crt;
    # ssl_certificate_key /etc/nginx/ssl/default.key;

    server_name lanuel.dev;
    root /var/www/lanuel/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri @proxy;
    }

    location @proxy {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3003;
    }

    location ~ ^/(api|broadcasting) {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass fastcgi_backend;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/lanuel_error.log;
    access_log /var/log/nginx/lanuel_access.log;
}

```

### Install and run PM2
```bash
npm install -g pm2

pm2 start
```
