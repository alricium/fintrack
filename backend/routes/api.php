<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EarningController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\ReportController;

Route::get('/earnings', [EarningController::class, 'index']);  
Route::post('/earnings', [EarningController::class, 'store']); 
Route::put('/earnings/{id}', [EarningController::class, 'update']);
Route::delete('/earnings/{id}', [EarningController::class, 'destroy']);
Route::get('/earnings/chart', [EarningController::class, 'chartData']);
Route::get('/reports/monthly', [ReportController::class, 'monthly']);
Route::get('/reports/annual', [ReportController::class, 'annual']);
Route::get('/ai/insights', [AIController::class, 'insights']);
Route::post('/earnings/bulk', [EarningController::class, 'bulkStore']);