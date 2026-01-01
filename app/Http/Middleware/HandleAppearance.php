<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $cookie = $request->cookie(Config::get('custom.cookie.appearance', 'appearance'));

        $appearance = in_array($cookie, ['light', 'dark']) ? $cookie : 'system';

        View::share('appearance', $appearance);

        Inertia::share('appearance', $appearance);

        return $next($request);
    }
}
