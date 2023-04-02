<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        $task = $this->taskRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'task List',
            'data' => $task,
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
        // 'task_id' => 'required',
    ],[
        'name.required' => 'Please give task name',
        'description.required' => 'Please give task description',
    ]);
    if($validator->fails()){
        return response()->json([
            'success' => false,
            'message' => 'task List',
            'data' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }
        
    $task = $this->taskRepository->create($request);

        return response()->json([
            'success' => true,
            'message' => 'task Stored',
            'data' => $task,
        ]);

    }


    public function show($id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'task List',
                'data' => $task,
            ]);

        }
        return response()->json([
            'success' => true,
            'message' => 'task List',
            'data' => $task,
        ]);
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'task Not Found',
                'errors' => null,
            ]);
        }

        $formData = $request->all();
            $validator = \Validator::make($formData,[
            'name' => 'required',
            'description' => 'required',
            // 'task_id' => 'required',
        ],[
            'name.required' => 'Please give task name',
            'description.required' => 'Please give task description',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'task List',
                'data' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
            
        $task = $this->taskRepository->edit($request, $id);

            return response()->json([
                'success' => true,
                'message' => 'task Updated',
                'data' => $task,
            ]);
    }


    public function destroy($id)
    {
        $task = $this->taskRepository->delete($id);
        if(is_null($task)){
            return response()->json([
                'success' => false,
                'message' => 'task Not Found',
                'errors' => null,
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'task Deleted',
            'data' => $task,
        ]);
    }
}
