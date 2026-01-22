<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HandleLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: [
            'appearance',
            'locale',
            'sidebar',
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ], prepend: [
            HandleLocale::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if ($response->getStatusCode() === 403) {
                return Inertia::render('errors/403', ['message' => $exception->getMessage() ?: null])
                    ->toResponse($request)
                    ->setStatusCode(403);
            }

            if ($response->getStatusCode() === 404) {
                return Inertia::render('errors/404')
                    ->toResponse($request)
                    ->setStatusCode(404);
            }

            if ($response->getStatusCode() === 429) {
                return Inertia::render('errors/429')
                    ->toResponse($request)
                    ->setStatusCode(429);
            }

            if ($response->getStatusCode() === 419) {
                Inertia::flash('toast', new FlashMessage($exception->getMessage() ?: __('http-statuses.419'), 'error'));

                return back();
            }

            return $response;
        });
    })->create();
