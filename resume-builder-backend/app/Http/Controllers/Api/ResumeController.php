<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{
    Resume,
    PersonalDetails,
    Socials,
    Experience,
    Education,
    Project,
    Certifications
};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ResumeController extends Controller
{
    public function index()
    {
        return response()->json(
            Resume::where('user_id', Auth::id())
                ->with([
                    'personal_details',
                    'socials',
                    'experiences',
                    'educations',
                    'projects',
                    'certifications',
                ])
                ->latest()
                ->get()
        );
    }

    
   public function store(Request $request)
{
    $request->validate([
        // Resume
        'title'       => 'required|string|max:255',
        'summary'     => 'nullable|string',
        'skills'      => 'nullable|array',
        'languages'   => 'nullable|array',
        'template'    => 'nullable|string',
        'accentColor' => 'nullable|string|max:20',

        // Personal Details
        'personal_details' => 'nullable|array',
        'personal_details.fullName'     => 'nullable|string|max:255',
        'personal_details.designation'  => 'nullable|string|max:255',
        'personal_details.email'        => 'nullable|email',
        'personal_details.phone'        => 'nullable|string|max:20',
        'personal_details.location'     => 'nullable|string|max:255',

        // Sections
        'socials'         => 'nullable|array',
        'experiences'     => 'nullable|array',
        'educations'      => 'nullable|array',
        'projects'        => 'nullable|array',
        'certifications' => 'nullable|array',
    ]);

    return DB::transaction(function () use ($request) {

        $resume = Resume::create([
            'title'       => $request->title,
            'summary'     => $request->summary,
            'skills'      => $request->skills ?? [],
            'languages'   => $request->languages ?? [],
            'template'    => $request->template ?? 'modern',
            'accentColor' => $request->accentColor,
            'user_id'     => Auth::id(),
        ]);

        if ($request->filled('personal_details')) {
            $resume->personal_details()->create($request->personal_details);
        }

        if (!empty(array_filter($request->socials ?? []))) {
            $resume->socials()->create($request->socials);
        }

        $resume->experiences()->createMany($request->experiences ?? []);
        $resume->educations()->createMany($request->educations ?? []);
        $resume->projects()->createMany($request->projects ?? []);
        $resume->certifications()->createMany($request->certifications ?? []);

        return response()->json(
            $resume->load([
                'personal_details',
                'socials',
                'experiences',
                'educations',
                'projects',
                'certifications',
            ]),
            201
        );
    });
}



    
    public function show(Resume $resume)
    {
        

        return response()->json(
            $resume->load([
                'personal_details',
                'socials',
                'experiences',
                'educations',
                'projects',
                'certifications',
            ])
        );
    }
public function update(Request $request, Resume $resume)
{
    return DB::transaction(function () use ($request, $resume) {

        /* ---------------- Resume ---------------- */
        $resume->update([
    'title' => $request->title,
    'summary' => $request->summary,
    'skills' => json_encode($request->skills ?? []),
    'languages' => json_encode($request->languages ?? []),
    'template' => $request->template ?? $resume->template,
    'accentColor' => $request->accentColor ?? $resume->accentColor,
]);
        /* ---------------- Personal Details ---------------- */
        if ($request->has('personal_details')) {
            PersonalDetails::where('resume_id', $resume->id)->delete();

            if (!empty($request->personal_details)) {
                PersonalDetails::create([
                    'resume_id' => $resume->id,
                    ...$request->personal_details,
                ]);
            }
        }

        /* ---------------- Socials ---------------- */
        if ($request->has('socials')) {
            Socials::where('resume_id', $resume->id)->delete();

            if (!empty($request->socials)) {
                Socials::create([
                    'resume_id' => $resume->id,
                    ...$request->socials,
                ]);
            }
        }

        /* ---------------- Experience ---------------- */
        if ($request->has('experience')) {
            Experience::where('resume_id', $resume->id)->delete();

            foreach ($request->experience as $item) {
                Experience::create([
                    'resume_id' => $resume->id,
                    'organization' => $item['organization'] ?? null,
                    'position' => $item['position'] ?? null,
                    'description' => $item['description'] ?? null,
                    'startDate' => $item['startDate'] ?: null,
                    'endDate' => $item['endDate'] ?: null,
                ]);
            }
        }

        /* ---------------- Education ---------------- */
        if ($request->has('education')) {
            Education::where('resume_id', $resume->id)->delete();

            foreach ($request->education as $item) {
                Education::create([
                    'resume_id' => $resume->id,
                    'institution' => $item['institution'] ?? null,
                    'degree' => $item['degree'] ?? null,
                    'field' => $item['field'] ?? null,
                    'grade' => $item['grade'] ?? null,
                    'startDate' => $item['startDate'] ?: null,
                    'endDate' => $item['endDate'] ?: null,
                ]);
            }
        }

        /* ---------------- Projects ---------------- */
        if ($request->has('projects')) {
            Project::where('resume_id', $resume->id)->delete();

            foreach ($request->projects as $item) {
                Project::create([
                    'resume_id' => $resume->id,
                    'name' => $item['name'] ?? null,
                    'description' => $item['description'] ?? null,
                    'technologies' => $item['technologies'] ?? [],
                    'liveLink' => $item['liveLink'] ?? null,
                    'githubLink' => $item['githubLink'] ?? null,
                    'startDate' => $item['startDate'] ?: null,
                    'endDate' => $item['endDate'] ?: null,
                ]);
            }
        }

        /* ---------------- Certifications ---------------- */
        if ($request->has('certifications')) {
            Certifications::where('resume_id', $resume->id)->delete();

            foreach ($request->certifications as $item) {
                Certifications::create([
                    'resume_id' => $resume->id,
                    'title' => $item['title'] ?? null,
                    'issuer' => $item['issuer'] ?? null,
                    'date' => $item['date'] ?: null,
                    'url' => $item['url'] ?? null,
                ]);
            }
        }

        return response()->json(
            $resume->load([
                'personal_details',
                'socials',
                'experiences',
                'educations',
                'projects',
                'certifications',
            ])
        );
    });
}



    
    public function destroy(Resume $resume)
    {
       

        DB::transaction(function () use ($resume) {
            PersonalDetails::where('resume_id', $resume->id)->delete();
            Socials::where('resume_id', $resume->id)->delete();
            Experience::where('resume_id', $resume->id)->delete();
            Education::where('resume_id', $resume->id)->delete();
            Project::where('resume_id', $resume->id)->delete();
            Certifications::where('resume_id', $resume->id)->delete();
            $resume->delete();
        });

        return response()->json(['message' => 'Resume deleted']);
    }

    
    public function adminIndex()
    {
        $this->authorizeAdmin();

        return response()->json(
            Resume::with([
                'user',
                'personal_details',
                'socials',
            ])
            ->withCount([
                'experiences',
                'educations',
                'projects',
                'certifications',
            ])
            ->latest()
            ->paginate(20)
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Authorization helpers
    |--------------------------------------------------------------------------
    */
    private function authorizeOwner(Resume $resume): void
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }

    private function authorizeAdmin(): void
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Admins only');
        }
    }
}
