<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cookie\CookieValuePrefix;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        Auth::shouldUse('sanctum');
        $cookieName = config('auth.cookie_name');
        $token = $request->cookie($cookieName);

        if (!$token && ($token = $request->bearerToken())) {
            $token = decrypt($token, false);
            $token = CookieValuePrefix::validate($cookieName, $token, app('encrypter')->getKey());
        }

        if ($token) {
            $request->headers->set('Authorization', "Bearer {$token}");
        }

        return $next($request);
    }
}
