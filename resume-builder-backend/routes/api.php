<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\TemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES (PUBLIC)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::prefix('resumes')->group(function () {
        Route::get('/', [ResumeController::class, 'index']);
        Route::post('/', [ResumeController::class, 'store']);
        Route::get('/{resume}', [ResumeController::class, 'show']);
        Route::put('/{resume}', [ResumeController::class, 'update']);
        Route::delete('/{resume}', [ResumeController::class, 'destroy']);
    });

    
    Route::prefix('sections')->group(function () {
        Route::put('/{section}', [SectionController::class, 'update']);
        Route::delete('/{section}', [SectionController::class, 'destroy']);
    });

    
    Route::prefix('admin')->group(function () {
        Route::get('/resumes', [ResumeController::class, 'adminIndex']);
    });
});

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('templates')->group(function () {
    Route::get('/', [TemplateController::class, 'index']);
    Route::get('/{template}', [TemplateController::class, 'show']);
});
