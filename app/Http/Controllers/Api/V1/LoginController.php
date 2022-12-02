<?php

namespace App\Http\Controllers\Api\V1;

use App\Auth\Traits\ThrottlesLogins;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Cookie\CookieValuePrefix;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use ThrottlesLogins;

    public function __construct()
    {
        $this->middleware('guest')->only('login');
        $this->middleware('auth')->only('logout');
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($user = $this->attemptLogin($request)) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }

            $this->clearLoginAttempts($request);

            $token = $user->createToken($request->userAgent());

            return response()->json([
                'user' => $user,
                'token' => app('encrypter')->encrypt(
                    CookieValuePrefix::create(
                        config('auth.cookie_name'),
                        app('encrypter')->getKey()
                    ) . $token->plainTextToken,
                    false
                ),
            ], 200)->cookie(
                config('auth.cookie_name'),
                $token->plainTextToken,
                $request->boolean('remember') ? config('sanctum.expiration', 365 * 1440) : null,
                '/',
                null,
                null,
                true,
            );
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\User|null
     */
    protected function attemptLogin(Request $request)
    {
        $email = $request->input($this->username());
        $password = $request->input('password');

        /** @var \App\Models\User $user */
        $user = User::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        if (!Hash::check($password, $user->password)) {
            return null;
        }

        if (!$user->hasVerifiedEmail()) {
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.verify')],
            ]);
        }

        return $user;
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([], 200)->withoutCookie(config('auth.cookie_name'), '/');
    }
}
