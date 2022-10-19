<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test', function () {
    return ['test' => 'ok'];
})->name('test');

Route::group([
    'as' => 'v1.',
    'prefix' => 'v1',
], function () {
    Route::post('login', [\App\Http\Controllers\Api\V1\LoginController::class, 'login'])->name('login');
    Route::post('logout', [\App\Http\Controllers\Api\V1\LoginController::class, 'logout'])->name('logout');

    Route::group([
        'middleware' => ['auth'],
    ], function () {
        Route::get('me', [\App\Http\Controllers\Api\V1\UserController::class, 'me'])->name('me');
    });
});
