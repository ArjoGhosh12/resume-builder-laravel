<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;

class TemplateController extends Controller
{
    // GET /api/templates
    public function index()
    {
        return response()->json(Template::all(), 200);
    }

    // GET /api/templates/{id}
    public function show($id)
    {
        $template = Template::findOrFail($id);
        return response()->json($template, 200);
    }
}
