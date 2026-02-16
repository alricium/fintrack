<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use App\Models\Earning;

class ReportController extends Controller
{
    public function monthly()
    {
        $data = Earning::select(
                DB::raw('YEAR(date) as year'),
                DB::raw('MONTH(date) as month'),
                DB::raw("SUM(IF(type='income', amount, 0)) as total_income"),
                DB::raw("SUM(IF(type='expense', amount, 0)) as total_expense")
            )
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();
    
        return response()->json($data);
    }

    public function annual()
    {
        $data = Earning::select(
                DB::raw('YEAR(date) as year'),
                DB::raw("SUM(IF(type='income', amount, 0)) as total_income"),
                DB::raw("SUM(IF(type='expense', amount, 0)) as total_expense")
            )
            ->groupBy('year')
            ->orderBy('year')
            ->get();
    
        return response()->json($data);
    }    
}