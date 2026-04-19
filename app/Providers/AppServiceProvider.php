<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /** @var Application */
        $app = $this->app;

        // Prevent lazy loading
        Model::preventLazyLoading(! $app->isProduction());

        // ======================================================================
        // POSTGRES MODEL BINDING FIX
        // https://github.com/laravel/framework/issues/26239
        // ======================================================================
        Route::pattern('employee', '[0-9]+');
        Route::pattern('id', '[0-9]+');
        Route::pattern('profile', '[0-9]+');
        Route::pattern('project', '[0-9]+');
        Route::pattern('task', '[0-9]+');
        Route::pattern('team', '[0-9]+');
        Route::pattern('user', '[0-9]+');
    }
}
