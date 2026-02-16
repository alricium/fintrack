<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Earning;

class EarningController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');
        $query = Earning::query();

        if ($type && in_array($type, ['income', 'expense'])) {
            $query->where('type', $type);
        }

        return response()->json($query->orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'category'    => 'required|string',
            'amount'      => 'required|numeric',
            'type'        => 'required|in:income,expense',
            'date'        => 'required|date',
        ]);

        $earning = Earning::create($validated);

        return response()->json($earning, 201);
    }

    public function update(Request $request, $id)
    {
        $earning = Earning::findOrFail($id);

        $validated = $request->validate([
            'description' => 'required|string',
            'category'    => 'required|string',
            'amount'      => 'required|numeric',
            'type'        => 'required|in:income,expense',
            'date'        => 'required|date',
        ]);

        $earning->update($validated);

        return response()->json($earning);
    }

    public function destroy($id)
    {
        $earning = Earning::findOrFail($id);
        $earning->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function chartData()
    {
        $earnings = Earning::orderBy('date')->get();
    
        $labels = $earnings->pluck('date')->unique()->values()->all();
        $incomeData = [];
        $expenseData = [];
    
        foreach ($labels as $date) {
            $incomeData[] = $earnings->where('date', $date)->where('type', 'income')->sum('amount');
            $expenseData[] = $earnings->where('date', $date)->where('type', 'expense')->sum('amount');
        }
    
        return response()->json([
            'labels' => $labels,
            'income' => $incomeData,
            'expense' => $expenseData,
        ]);
    }    

    public function bulkStore(Request $request)
    {
        $data = $request->all();
    
        foreach ($data as $item) {
            Earning::create($item);
        }
    
        return response()->json(['message' => 'Earnings added successfully'], 201);
    }
}