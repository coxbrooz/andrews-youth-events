<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

// Auth route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- EVENT API ROUTES ---
// This single line handles GET, POST, PUT, and DELETE automatically
Route::apiResource('events', EventController::class);