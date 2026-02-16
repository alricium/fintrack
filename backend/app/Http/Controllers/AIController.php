<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Earning;

class AIController extends Controller
{
    public function insights()
    {
        $earnings = Earning::all();

        $totalIncome = $earnings->where('type', 'income')->sum('amount');
        $totalExpense = $earnings->where('type', 'expense')->sum('amount');
        $netProfit = $totalIncome - $totalExpense;

        $profitMargin = $totalIncome > 0
            ? round(($netProfit / $totalIncome) * 100, 2)
            : 0;

        /*
        |--------------------------------------------------------------------------
        | AI MODE SWITCH
        |--------------------------------------------------------------------------
        | Default: Manual rule-based analysis (free, local testing)
        | To enable real AI:
        | 1. Install openai-php/client
        | 2. Add OPENAI_API_KEY in .env
        | 3. Set AI_ENABLED=true in .env
        */

        if (env('AI_ENABLED', false) && env('OPENAI_API_KEY')) {
            return $this->generateAIInsight(
                $totalIncome,
                $totalExpense,
                $netProfit,
                $profitMargin
            );
        }

        // Default mock insight (no cost)
        $message = $this->generateManualInsight(
            $totalIncome,
            $totalExpense,
            $netProfit,
            $profitMargin
        );

        return response()->json([
            'message' => $message
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | MANUAL RULE-BASED INSIGHT (FREE MODE)
    |--------------------------------------------------------------------------
    */

    private function generateManualInsight($income, $expense, $net, $margin)
    {
        if ($income == 0) {
            return "No income record found yet. It is recommended to add income first.";
        }
        
        if ($margin < 0) {
            return "Expenses have exceeded income. Expense items should be reviewed urgently.";
        }
        
        if ($margin < 10) {
            return "Profit margin is low. A strategy to reduce fixed expenses should be considered.";
        }
        
        if ($margin < 30) {
            return "The financial structure is balanced, but there is room for improvement.";
        }
        
        return "Profitability looks strong. Investment or expansion plans may be considered.";        
    }

    /*
    |--------------------------------------------------------------------------
    | REAL AI INSIGHT (OPTIONAL - REQUIRES API KEY)
    |--------------------------------------------------------------------------
    */

    private function generateAIInsight($income, $expense, $net, $margin)
    {
        try {
            $client = \OpenAI::client(env('OPENAI_API_KEY'));

            $summary = "
                Total Income: {$income}
                Total Expense: {$expense}
                Net Profit: {$net}
                Profit Margin: {$margin}%
            ";

            $prompt = "
                Act as a professional financial advisor.
                Analyze the financial summary below.
                Identify risks and improvement opportunities.
                Keep response under 150 words.

                {$summary}
            ";

            $response = $client->chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

            return response()->json([
                'message' => $response->choices[0]->message->content
            ]);

        } catch (\Exception $e) {

            // Fallback to manual insight if AI fails
            return response()->json([
                'message' => $this->generateManualInsight($income, $expense, $net, $margin)
            ]);
        }
    }
}