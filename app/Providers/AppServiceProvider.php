<?php

namespace App\Providers;

use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('app.log_db_query')) {
            DB::listen(function (QueryExecuted $query) {
                /** @var \Illuminate\Log\Logger $logger */
                $logger = Log::channel('db');
                $logger->info([
                    $query->sql,
                    $query->bindings,
                    $query->time,
                ]);
            });
        }
    }
}
