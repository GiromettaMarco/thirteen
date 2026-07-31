<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    /**
     * List of available locales.
     *
     * @var array<int, string>
     */
    public $available = [
        'en',
        'it',
    ];

    /**
     * Check if locale is supported.
     */
    public function isAvailable(string $locale): bool
    {
        return in_array($locale, $this->available);
    }

    /**
     * Set locale for the application.
     *
     * @return bool `true` if locale has been set and `false` otherwise.
     */
    public function setAppLocale(string $locale): bool
    {
        if ($this->isAvailable($locale)) {
            App::setLocale($locale);

            return true;
        }

        return false;
    }

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        ($this->setLocaleByCookie($request) || $this->setLocaleByHeader($request));

        return $next($request);
    }

    /**
     * Undocumented function
     *
     * @return bool `true` if locale has been set and `false` otherwise.
     */
    protected function setLocaleByCookie(Request $request): bool
    {
        /** @var string|null $cookie_locale */
        $cookie_locale = $request->cookie(Config::get('custom.cookie.locale', 'locale'));

        if ($cookie_locale) {
            return $this->setAppLocale($cookie_locale);
        }

        return false;
    }

    /**
     * Set app locale by Accept-Language header.
     *
     * @return bool `true` if locale has been set and `false` otherwise.
     */
    protected function setLocaleByHeader(Request $request): bool
    {
        $accept_language = explode(',', strtolower(trim($request->header('Accept-Language', '*'))));
        $parsed_language = [];

        foreach ($accept_language as $qualityLang) {
            $qLangArr = array_map('trim', explode(';', trim($qualityLang)));
            $q = 1;

            if (isset($qLangArr[1]) && substr($qLangArr[1], 0, 2) === 'q=') {
                $q = (float) substr($qLangArr[1], 2);
            }

            $parsed_language[] = ['q' => $q, 'lang' => $qLangArr[0]];
        }

        usort($parsed_language, function ($a, $b) {
            return ($a['q'] > $b['q']) ? -1 : 1;
        });

        foreach ($parsed_language as $lang) {
            if ($this->setAppLocale($lang['lang'])) {
                return true;
            }

            if (str_contains($lang['lang'], '-')) {
                $no_country_lang = explode('-', $lang['lang'])[0];

                if ($this->setAppLocale($no_country_lang)) {
                    return true;
                }
            }
        }

        return false;
    }

    // protected function setLocaleByDB(Request $request): bool
    // {
    //     if (Auth::check()) {
    //         $dbLanguage = Auth::user()->language;
    //         if ($dbLanguage !== 'system') {
    //             App::setLocale($dbLanguage);

    //             return true;
    //         }
    //     }

    //     return false;
    // }
}
