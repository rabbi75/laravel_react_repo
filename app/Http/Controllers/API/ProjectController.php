<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProjectRepository;

class ProjectController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $project = $this->projectRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Project List',
            'data' => $project,
        ]);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData,[
        'name' => 'required',
        'description' => 'required',
        // 'user_id' => 'required',
    ],[
        'name.required' => 'Please give project name',
        'description.required' => 'Please give project description',
    ]);
    if($validator->fails()){
        return response()->json([
            'success' => false,
            'message' => 'Project List',
            'data' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }
        
    $project = $this->projectRepository->create($request);

        return response()->json([
            'success' => true,
            'message' => 'Project Stored',
            'data' => $project,
        ]);

    }


    public function show($id)
    {
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project List',
                'data' => $project,
            ]);

        }
        return response()->json([
            'success' => true,
            'message' => 'Project List',
            'data' => $project,
        ]);
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project Not Found',
                'errors' => null,
            ]);
        }

        $formData = $request->all();
            $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            // 'user_id' => 'required',
        ],[
            'name.required' => 'Please give project name',
            'description.required' => 'Please give project description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Project List',
                'data' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
            
        $project = $this->projectRepository->edit($request, $id);

            return response()->json([
                'success' => true,
                'message' => 'Project Updated',
                'data' => $project,
            ]);
    }


    public function destroy($id)
    {
        $project = $this->projectRepository->delete($id);
        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project Not Found',
                'errors' => null,
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Project Deleted',
            'data' => $project,
        ]);
    }
}
