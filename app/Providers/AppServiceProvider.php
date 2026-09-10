<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

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
        $this->configureDefaults();
        $this->configureRateLimiting();
        $this->configureRoutePatterns();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        // @see https://dev.to/paulund/laravel-immutable-carbon-dates-1jf9
        Date::use(CarbonImmutable::class);

        // @see https://laravel-news.com/prevent-destructive-commands-from-running-in-laravel-11
        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // @see https://laravel.com/docs/13.x/eloquent-relationships#automatic-eager-loading
        Model::automaticallyEagerLoadRelationships();
        Model::preventLazyLoading();
        Model::preventSilentlyDiscardingAttributes();

        // @see https://laravel.com/docs/13.x/validation#validating-passwords
        Password::defaults(fn (): Password => Password::min(12)
            ->mixedCase()
            ->letters()
            ->numbers()
            ->symbols()
        );
    }

    /**
     * Configure rate limiting for the application.
     */
    protected function configureRateLimiting(): void
    {
        $max_attempts = Config::get('custom.global_limiter', 0);

        RateLimiter::for('global', fn () => $max_attempts
            ? Limit::perMinute($max_attempts)->by(request()->ip())
            : Limit::none()
        );
    }

    /**
     * Limit id routes to numeric characters.
     *
     * Required when using postgres.
     *
     * @see https://github.com/laravel/framework/issues/26239
     */
    protected function configureRoutePatterns(): void
    {
        Route::pattern('employee', '[0-9]+');
        Route::pattern('id', '[0-9]+');
        Route::pattern('profile', '[0-9]+');
        Route::pattern('project', '[0-9]+');
        Route::pattern('task', '[0-9]+');
        Route::pattern('team', '[0-9]+');
        Route::pattern('user', '[0-9]+');
    }
}
