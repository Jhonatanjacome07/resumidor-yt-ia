<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\VideoAnalysisController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});

    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->middleware(['guest', 'throttle:6,1']);

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware(['guest', 'throttle:6,1']);

Route::middleware(['auth:sanctum'])->post('/analyze-video', [VideoAnalysisController::class, 'analyze']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/summaries', [VideoAnalysisController::class, 'index']);
    Route::delete('/summaries/{id}', [VideoAnalysisController::class, 'destroy']);
});